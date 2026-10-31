# ── Stage 1: Builder ─────────────────────────────────────────────
FROM python:3.12-slim AS builder

WORKDIR /build

COPY app/requirements.txt .

RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ── Stage 2: Runtime ─────────────────────────────────────────────
FROM python:3.12-slim AS runtime

# Security: create non-root user with explicit UID/GID
RUN groupadd --gid 1001 nonroot \
    && useradd --uid 1001 --gid nonroot --shell /sbin/nologin \
       --create-home nonroot

WORKDIR /home/nonroot

# Copy Python packages from builder stage
COPY --from=builder /install/lib /usr/local/lib
COPY --from=builder /install/bin /usr/local/bin

# Copy application source
COPY --chown=nonroot:nonroot app/ ./app/

# Runtime configuration with sane defaults
ENV GUNICORN_BIND=0.0.0.0:5000
ENV GUNICORN_WORKERS=2

USER nonroot

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')"

CMD ["sh", "-c", \
     "exec gunicorn --bind $GUNICORN_BIND --workers $GUNICORN_WORKERS 'app.src.main:create_app()'"]
