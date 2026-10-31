"""Flask application factory and route definitions."""

import os
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory
from prometheus_flask_exporter import PrometheusMetrics

from app.src.config import config_by_name
from app.src.models import Task, db

BASE_DIR = Path(__file__).resolve().parent


def create_app(config_name=None):
    """Create and configure the Flask application."""
    if config_name is None:
        config_name = os.environ.get(
            'FLASK_ENV', 'development'
        )

    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    db.init_app(app)

    # Initialize Prometheus metrics for observability
    if not app.config.get('TESTING'):
        PrometheusMetrics(app, path='/metrics')
    else:
        # In testing, avoid metric collision and export defaults
        PrometheusMetrics(app, path='/metrics', export_defaults=False)

    with app.app_context():
        db.create_all()

    register_routes(app)
    register_error_handlers(app)

    return app


def register_routes(app):
    """Register all application routes."""

    @app.route('/', methods=['GET'])
    def index():
        """Serve the static frontend dashboard."""
        static_folder = BASE_DIR / 'static'
        if (static_folder / 'index.html').exists():
            return send_from_directory(static_folder, 'index.html')
        return jsonify({'message': 'TaskFlow DevOps API'}), 200

    @app.route('/health', methods=['GET'])
    @app.route('/api/health', methods=['GET'])
    def health():
        """Health-check endpoint for CI smoke tests."""
        return jsonify({'status': 'healthy'}), 200

    @app.route('/tasks', methods=['GET'])
    @app.route('/api/tasks', methods=['GET'])
    def list_tasks():
        """Return all tasks ordered by creation date."""
        tasks = Task.query.order_by(
            Task.created_at.desc()
        ).all()
        return jsonify([t.to_dict() for t in tasks]), 200

    @app.route('/tasks/<int:task_id>', methods=['GET'])
    @app.route('/api/tasks/<int:task_id>', methods=['GET'])
    def get_task(task_id):
        """Return a single task by ID."""
        task = db.session.get(Task, task_id)
        if task is None:
            return jsonify({'error': 'Task not found'}), 404
        return jsonify(task.to_dict()), 200

    @app.route('/tasks', methods=['POST'])
    @app.route('/api/tasks', methods=['POST'])
    def create_task():
        """Create a new task."""
        data = request.get_json(silent=True)
        if not data or not data.get('title'):
            return jsonify(
                {'error': 'Title is required'}
            ), 400

        title = str(data['title']).strip()
        if not title:
            return jsonify(
                {'error': 'Title is required'}
            ), 400

        status = data.get('status', 'pending')
        if status not in Task.VALID_STATUSES:
            return jsonify({
                'error': (
                    'Invalid status. '
                    'Must be one of: '
                    + ', '.join(Task.VALID_STATUSES)
                )
            }), 400

        task = Task(
            title=title,
            description=data.get('description', ''),
            status=status,
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201

    @app.route('/tasks/<int:task_id>', methods=['PUT'])
    @app.route('/api/tasks/<int:task_id>', methods=['PUT'])
    def update_task(task_id):
        """Update an existing task."""
        task = db.session.get(Task, task_id)
        if task is None:
            return jsonify({'error': 'Task not found'}), 404

        data = request.get_json(silent=True)
        if not data:
            return jsonify(
                {'error': 'Request body is required'}
            ), 400

        if 'title' in data:
            title = str(data['title']).strip()
            if not title:
                return jsonify(
                    {'error': 'Title cannot be empty'}
                ), 400
            task.title = title

        if 'description' in data:
            task.description = data['description']

        if 'status' in data:
            if data['status'] not in Task.VALID_STATUSES:
                return jsonify({
                    'error': (
                        'Invalid status. '
                        'Must be one of: '
                        + ', '.join(Task.VALID_STATUSES)
                    )
                }), 400
            task.status = data['status']

        db.session.commit()
        return jsonify(task.to_dict()), 200

    @app.route('/tasks/<int:task_id>', methods=['DELETE'])
    @app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
    def delete_task(task_id):
        """Delete a task by ID."""
        task = db.session.get(Task, task_id)
        if task is None:
            return jsonify({'error': 'Task not found'}), 404
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted'}), 200


def register_error_handlers(app):
    """Register global error handlers."""

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({'error': 'Method not allowed'}), 405

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify(
            {'error': 'Internal server error'}
        ), 500


if __name__ == '__main__':
    application = create_app()
    host = os.environ.get('FLASK_HOST', '127.0.0.1')
    port = int(os.environ.get('FLASK_PORT', '5000'))
    application.run(host=host, port=port)
