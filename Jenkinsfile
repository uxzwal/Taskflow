pipeline {
    agent any

    environment {
        IMAGE_NAME = 'taskflow-api'
        IMAGE_TAG  = "${BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
        DOCKER_HUB_CREDS = credentials('dockerhub-creds')
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Code Quality & Unit Tests') {
            steps {
                sh '''
                    set -euo pipefail
                    python3 -m venv venv
                    . venv/bin/activate
                    pip install --upgrade pip
                    pip install -r app/requirements.txt
                    flake8 app/src
                    pytest --cov=app/src --cov-fail-under=80
                '''
            }
        }

        stage('Static Security Scan') {
            steps {
                sh '''
                    set -euo pipefail
                    . venv/bin/activate
                    bandit -r app/src
                '''
            }
        }

        stage('Build Container Image') {
            steps {
                sh '''
                    set -euo pipefail
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Vulnerability Scan (Trivy)') {
            steps {
                sh '''
                    set -euo pipefail
                    trivy image --severity HIGH,CRITICAL --exit-code 1 ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    set -euo pipefail
                    echo "$DOCKER_HUB_CREDS_PSW" | docker login -u "$DOCKER_HUB_CREDS_USR" --password-stdin
                    REGISTRY_TAG="${DOCKER_HUB_CREDS_USR}/${IMAGE_NAME}:${IMAGE_TAG}"
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} "${REGISTRY_TAG}"
                    docker push "${REGISTRY_TAG}"
                    docker logout
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Jenkins CI Pipeline completed successfully for ${IMAGE_NAME}:${IMAGE_TAG}."
        }
        failure {
            echo "Pipeline failed. Check stage logs for details."
        }
    }
}
