# Project Rules — TaskFlow DevOps
- Test command: `pytest --cov=app/src`
- Lint command: `flake8 app/src`
- Build command: `docker build -t taskflow-api:test .`
- Terraform validate: `terraform -chdir=terraform validate`
- Never use `latest` tag in production configs.
- Never hardcode AWS keys or secrets; use `.env.example` and GitHub Secrets.
- Every Dockerfile must use multi-stage build and a non-root user.
- Every script must use `set -euo pipefail`.
