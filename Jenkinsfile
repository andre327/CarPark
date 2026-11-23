
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Obteniendo codigo del repositorio...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Construyendo imagenes Docker...'
                sh 'docker compose build'
            }
        }

        stage('Test') {
            steps {
                echo 'Validando configuracion de Docker Compose...'
                sh 'docker compose config -q'
            }
        }
    }

    post {
        success {
            echo 'Proceso ejecutado exitosamente.'
        }

        failure {
            echo 'El proceso ha fallado. Revisar Console Output.'
        }

        always {
            echo 'Finalizando ejecucion del Pipeline.'
        }
    }
}
