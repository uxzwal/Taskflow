"""SQLAlchemy models for the TaskFlow application."""

from datetime import datetime, timezone

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def _utcnow():
    """Return current UTC time as a timezone-aware datetime."""
    return datetime.now(timezone.utc)


class Task(db.Model):
    """Task model representing a single work item."""

    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True, default='')
    status = db.Column(
        db.String(20), nullable=False, default='pending'
    )
    created_at = db.Column(
        db.DateTime, nullable=False, default=_utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False,
        default=_utcnow, onupdate=_utcnow
    )

    VALID_STATUSES = ('pending', 'in_progress', 'completed')

    def to_dict(self):
        """Serialize the task to a dictionary."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }

    def __repr__(self):
        return f'<Task {self.id}: {self.title}>'
