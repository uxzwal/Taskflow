#!/usr/bin/env bash
set -euo pipefail

# ── TaskFlow DevOps Smoke Test Script ────────────────────────────
# Validates core HTTP endpoints for CI/CD pipelines & post-deployment

TARGET_URL="${1:-http://localhost}"
echo "=========================================================="
echo " Starting TaskFlow Smoke Test against: ${TARGET_URL}"
echo "=========================================================="

# 1. Health check
echo -n "[1/5] Testing /health endpoint... "
HEALTH_RESP=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_URL}/health")
if [[ "${HEALTH_RESP}" -eq 200 ]]; then
    echo "PASS (HTTP 200)"
else
    echo "FAIL (HTTP ${HEALTH_RESP})"
    exit 1
fi

# 2. Metrics check
echo -n "[2/5] Testing /metrics observability endpoint... "
METRICS_RESP=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_URL}/metrics")
if [[ "${METRICS_RESP}" -eq 200 ]]; then
    echo "PASS (HTTP 200)"
else
    echo "FAIL (HTTP ${METRICS_RESP})"
    exit 1
fi

# 3. Create task
echo -n "[3/5] Testing task creation (POST /api/tasks)... "
CREATE_RESP=$(curl -s -X POST "${TARGET_URL}/api/tasks" \
    -H "Content-Type: application/json" \
    -d '{"title": "Automated Smoke Test Task", "description": "CI verification", "status": "in_progress"}')

TASK_ID=$(echo "${CREATE_RESP}" | python3 -c "import sys, json; print(json.load(sys.stdin).get('id', ''))")

if [[ -n "${TASK_ID}" && "${TASK_ID}" != "None" ]]; then
    echo "PASS (Created Task ID: ${TASK_ID})"
else
    echo "FAIL (Could not parse task ID)"
    echo "Response: ${CREATE_RESP}"
    exit 1
fi

# 4. Fetch task
echo -n "[4/5] Testing task retrieval (GET /api/tasks/${TASK_ID})... "
GET_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_URL}/api/tasks/${TASK_ID}")
if [[ "${GET_STATUS}" -eq 200 ]]; then
    echo "PASS (HTTP 200)"
else
    echo "FAIL (HTTP ${GET_STATUS})"
    exit 1
fi

# 5. Delete task
echo -n "[5/5] Testing task cleanup (DELETE /api/tasks/${TASK_ID})... "
DEL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "${TARGET_URL}/api/tasks/${TASK_ID}")
if [[ "${DEL_STATUS}" -eq 200 ]]; then
    echo "PASS (HTTP 200)"
else
    echo "FAIL (HTTP ${DEL_STATUS})"
    exit 1
fi

echo "=========================================================="
echo " All smoke tests passed successfully!"
echo "=========================================================="
