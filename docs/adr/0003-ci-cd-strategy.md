# ADR 0003: Multi-Stage CI/CD with Dual Pipeline Strategy

## Status
Accepted

## Context
A key goal of the TaskFlow capstone is proving mastery across modern CI/CD ecosystems with strict security gates and zero-downtime deployment practices.

## Decision
1. **Primary CI/CD:** GitHub Actions with branch protection, PR validation, automated staging deployment, and manual approval gates for production.
2. **Secondary CI:** Jenkins pipeline (`Jenkinsfile`) providing multi-stage build, lint, and Trivy scanning demonstration.
3. **Security Gates:** Flake8, pytest (>= 80% coverage), Bandit AST scan, and Trivy image/filesystem scan.

## Consequences
- **Pros:** Comprehensive coverage of both cloud-native (GitHub Actions) and enterprise on-premises (Jenkins) CI/CD paradigms.
- **Cons:** Requires maintaining workflow definitions across two pipeline formats.
