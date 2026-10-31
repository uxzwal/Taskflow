# Technical Requirements Document (TRD) — TaskFlow DevOps Platform

## 1. System Architecture
- **Tier 1 (Presentation & Reverse Proxy):** Hardened Nginx 1.27 (Alpine) running as non-root user `taskflow` (UID 1001), handling gzip, security headers, static UI delivery, and proxying `/api/` to upstream.
- **Tier 2 (Application Layer):** Python 3.12 Flask REST API served by Gunicorn WSGI workers. Runs as `nonroot` (UID 1001) in a multi-stage container.
- **Tier 3 (Database Layer):** PostgreSQL 16 (Alpine) with health-checks, credentials injected via environment variables, and persistent named volumes.
- **Observability Layer:** Prometheus 2.54 scraping `/metrics` every 15s; Grafana 11.2 auto-provisioning dashboards for request rate, p50/p95 latency, and service availability.
- **Cloud Infrastructure:** AWS EC2 `t2.micro` (Ubuntu 22.04 LTS), AWS S3 state bucket with KMS encryption and versioning, DynamoDB state lock table.

## 2. Security Specifications
- All container processes drop root privileges (`USER nonroot` / `USER taskflow`).
- Strict `.dockerignore` prevents leakage of `.env`, tests, or git history into container images.
- Bandit static analysis checks AST for Python vulnerabilities in every CI run.
- Trivy vulnerability scanner runs filesystem and container image scans.
- No hardcoded secrets. Production credentials injected via GitHub Secrets and AWS IAM.

## 3. Deployment Topology
- **Staging:** Automatic deployment on merge to `main`.
- **Production:** Protected GitHub environment requiring manual approval.
- **Health Checks:** Automated smoke test script (`scripts/smoke-test.sh`) validates HTTP 200, CRUD persistence, and metric exposition.
