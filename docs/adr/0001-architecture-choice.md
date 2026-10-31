# ADR 0001: Three-Tier Containerized Architecture

## Status
Accepted

## Context
TaskFlow requires an architecture that mirrors real-world production setups while remaining lightweight enough to run reliably on developer workstations and AWS Free Tier instances.

## Decision
We adopted a classic three-tier decoupled architecture:
1. **Tier 1 (Nginx):** Reverse proxy, static asset delivery, and SSL/TLS termination boundary.
2. **Tier 2 (Flask API):** Stateless Python application managed by Gunicorn.
3. **Tier 3 (PostgreSQL):** Relational database with schema enforcement.

## Consequences
- **Pros:** Clear separation of concerns, independent scaling potential, standard production topology.
- **Cons:** Slightly higher orchestration overhead compared to monolithic single-container designs.
