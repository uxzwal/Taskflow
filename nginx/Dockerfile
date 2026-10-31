# ── Stage 1: Build & Verify static assets ─────────────────────────
FROM alpine:3.20 AS builder

WORKDIR /assets
COPY app/src/static/ /assets/
RUN test -f /assets/index.html

# ── Stage 2: Hardened Non-Root Nginx Runtime ────────────────────
FROM nginx:1.27-alpine AS runtime

# Create non-root user and group
RUN addgroup -g 1001 -S taskflow && \
    adduser -u 1001 -S taskflow -G taskflow

# Set permissions for non-root execution
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R taskflow:taskflow /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx /var/run /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown taskflow:taskflow /var/run/nginx.pid

# Copy static frontend assets from builder stage
COPY --from=builder --chown=taskflow:taskflow /assets /usr/share/nginx/html

# Copy custom Nginx configuration
COPY --chown=taskflow:taskflow nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Security: drop root privileges
USER taskflow

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
