# ADR 0002: PostgreSQL as Relational Storage Engine

## Status
Accepted

## Context
The TaskFlow platform requires persistent task storage with ACID guarantees, schema validation, and compatibility with AWS RDS Free Tier if migrated to managed cloud storage.

## Decision
We chose PostgreSQL 16 on Alpine Linux for local and containerized deployments, backed by SQLAlchemy ORM in the application layer and SQLite for in-memory unit testing.

## Consequences
- **Pros:** Full relational integrity, native support in AWS RDS, isolated testing via in-memory SQLite fixtures.
- **Cons:** Requires a database health-check dependency during startup in Docker Compose.
