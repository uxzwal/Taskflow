"""Shared pytest fixtures for TaskFlow tests."""

import pytest

from app.src.main import create_app
from app.src.models import db as _db


@pytest.fixture()
def app():
    """Create a fresh Flask app with an in-memory database."""
    application = create_app('testing')
    yield application


@pytest.fixture()
def client(app):
    """Provide a Flask test client."""
    return app.test_client()


@pytest.fixture()
def db_session(app):
    """Provide a database session within the app context."""
    with app.app_context():
        yield _db.session
        _db.session.rollback()
