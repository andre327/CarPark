
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Obteniendo codigo del repositorio...'
                checkout scm
            }
        }

        stage('Validate Docker Compose') {
            steps {
                echo 'Validando configuracion de Docker Compose...'
                sh 'docker compose config -q'
            }
        }

        stage('Build Frontend and Backend') {
            steps {
                echo 'Construyendo imagen Docker del Frontend y Backend...'

                sh 'docker compose build --progress=plain frontend backend'
            }
        }

        stage('Verify Docker Images') {
            steps {
                echo 'Verificando las imagenes construidas...'

                sh 'docker image inspect parkcontrol-frontend:latest'
                sh 'docker image inspect parkcontrol-backend:latest'

                sh 'docker images'
            }
        }
    }

    post {
        success {
            echo 'Las imagenes Docker de Frontend y Backend fueron construidas correctamente.'
        }

        failure {
            echo 'El proceso ha fallado. Revisar Console Output.'
        }

        always {
            echo 'Finalizando ejecucion del Pipeline.'
        }
    }
}
