"""Tests for the TaskFlow Flask API."""


# ── Health endpoint ──────────────────────────────────────────────


class TestHealth:
    """Tests for GET /health."""

    def test_health_returns_200(self, client):
        resp = client.get('/health')
        assert resp.status_code == 200

    def test_health_returns_status_healthy(self, client):
        data = client.get('/health').get_json()
        assert data == {'status': 'healthy'}


# ── Create task ──────────────────────────────────────────────────


class TestCreateTask:
    """Tests for POST /tasks."""

    def test_create_task_success(self, client):
        resp = client.post('/tasks', json={
            'title': 'Write tests',
            'description': 'Cover all routes',
        })
        assert resp.status_code == 201
        data = resp.get_json()
        assert data['title'] == 'Write tests'
        assert data['description'] == 'Cover all routes'
        assert data['status'] == 'pending'
        assert 'id' in data
        assert 'created_at' in data
        assert 'updated_at' in data

    def test_create_task_with_valid_status(self, client):
        resp = client.post('/tasks', json={
            'title': 'Deploy',
            'status': 'in_progress',
        })
        assert resp.status_code == 201
        assert resp.get_json()['status'] == 'in_progress'

    def test_create_task_missing_title(self, client):
        resp = client.post('/tasks', json={
            'description': 'No title provided',
        })
        assert resp.status_code == 400
        assert 'error' in resp.get_json()

    def test_create_task_empty_title(self, client):
        resp = client.post('/tasks', json={'title': ''})
        assert resp.status_code == 400

    def test_create_task_whitespace_title(self, client):
        resp = client.post('/tasks', json={'title': '   '})
        assert resp.status_code == 400

    def test_create_task_no_body(self, client):
        resp = client.post('/tasks')
        assert resp.status_code == 400

    def test_create_task_invalid_status(self, client):
        resp = client.post('/tasks', json={
            'title': 'Bad status',
            'status': 'invalid',
        })
        assert resp.status_code == 400
        assert 'Invalid status' in resp.get_json()['error']

    def test_create_task_defaults(self, client):
        resp = client.post('/tasks', json={
            'title': 'Minimal',
        })
        data = resp.get_json()
        assert data['status'] == 'pending'
        assert data['description'] == ''


# ── List tasks ───────────────────────────────────────────────────


class TestListTasks:
    """Tests for GET /tasks."""

    def test_list_empty(self, client):
        resp = client.get('/tasks')
        assert resp.status_code == 200
        assert resp.get_json() == []

    def test_list_returns_created_tasks(self, client):
        client.post('/tasks', json={'title': 'Task A'})
        client.post('/tasks', json={'title': 'Task B'})
        resp = client.get('/tasks')
        assert resp.status_code == 200
        data = resp.get_json()
        assert len(data) == 2

    def test_list_ordered_newest_first(self, client):
        client.post('/tasks', json={'title': 'First'})
        client.post('/tasks', json={'title': 'Second'})
        data = client.get('/tasks').get_json()
        assert data[0]['title'] == 'Second'
        assert data[1]['title'] == 'First'


# ── Get single task ──────────────────────────────────────────────


class TestGetTask:
    """Tests for GET /tasks/<id>."""

    def test_get_existing_task(self, client):
        created = client.post(
            '/tasks', json={'title': 'Find me'}
        ).get_json()
        resp = client.get(f'/tasks/{created["id"]}')
        assert resp.status_code == 200
        assert resp.get_json()['title'] == 'Find me'

    def test_get_nonexistent_task(self, client):
        resp = client.get('/tasks/99999')
        assert resp.status_code == 404
        assert 'error' in resp.get_json()


# ── Update task ──────────────────────────────────────────────────


class TestUpdateTask:
    """Tests for PUT /tasks/<id>."""

    def _create(self, client, title='Original'):
        return client.post(
            '/tasks', json={'title': title}
        ).get_json()

    def test_update_title(self, client):
        task = self._create(client)
        resp = client.put(
            f'/tasks/{task["id"]}',
            json={'title': 'Updated'},
        )
        assert resp.status_code == 200
        assert resp.get_json()['title'] == 'Updated'

    def test_update_description(self, client):
        task = self._create(client)
        resp = client.put(
            f'/tasks/{task["id"]}',
            json={'description': 'New desc'},
        )
        assert resp.status_code == 200
        assert resp.get_json()['description'] == 'New desc'

    def test_update_status(self, client):
        task = self._create(client)
        resp = client.put(
            f'/tasks/{task["id"]}',
            json={'status': 'completed'},
        )
        assert resp.status_code == 200
        assert resp.get_json()['status'] == 'completed'

    def test_update_nonexistent(self, client):
        resp = client.put(
            '/tasks/99999', json={'title': 'Nope'}
        )
        assert resp.status_code == 404

    def test_update_no_body(self, client):
        task = self._create(client)
        resp = client.put(f'/tasks/{task["id"]}')
        assert resp.status_code == 400

    def test_update_empty_title(self, client):
        task = self._create(client)
        resp = client.put(
            f'/tasks/{task["id"]}', json={'title': ''}
        )
        assert resp.status_code == 400

    def test_update_whitespace_title(self, client):
        task = self._create(client)
        resp = client.put(
            f'/tasks/{task["id"]}', json={'title': '  '}
        )
        assert resp.status_code == 400

    def test_update_invalid_status(self, client):
        task = self._create(client)
        resp = client.put(
            f'/tasks/{task["id"]}',
            json={'status': 'nope'},
        )
        assert resp.status_code == 400
        assert 'Invalid status' in resp.get_json()['error']


# ── Delete task ──────────────────────────────────────────────────


class TestDeleteTask:
    """Tests for DELETE /tasks/<id>."""

    def test_delete_existing_task(self, client):
        created = client.post(
            '/tasks', json={'title': 'Delete me'}
        ).get_json()
        resp = client.delete(f'/tasks/{created["id"]}')
        assert resp.status_code == 200
        assert resp.get_json()['message'] == 'Task deleted'
        # Confirm it is gone
        get_resp = client.get(f'/tasks/{created["id"]}')
        assert get_resp.status_code == 404

    def test_delete_nonexistent_task(self, client):
        resp = client.delete('/tasks/99999')
        assert resp.status_code == 404


# ── Error handlers ───────────────────────────────────────────────


class TestErrorHandlers:
    """Tests for global error handlers."""

    def test_404_unknown_route(self, client):
        resp = client.get('/does-not-exist')
        assert resp.status_code == 404
        assert 'error' in resp.get_json()

    def test_405_wrong_method(self, client):
        resp = client.patch('/health')
        assert resp.status_code == 405
        assert 'error' in resp.get_json()


# ── Frontend & Observability ─────────────────────────────────────


class TestFrontendAndObservability:
    """Tests for GET / and /metrics."""

    def test_index_page(self, client):
        resp = client.get('/')
        assert resp.status_code == 200
        assert b'TaskFlow' in resp.data

    def test_api_health_alias(self, client):
        resp = client.get('/api/health')
        assert resp.status_code == 200
        assert resp.get_json() == {'status': 'healthy'}

    def test_metrics_endpoint(self, client):
        resp = client.get('/metrics')
        assert resp.status_code == 200
