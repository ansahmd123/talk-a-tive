pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    stages {
        stage('Prepare Environment') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                script {
                    // Navigate to the root directory and install backend dependencies
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                script {
                    // Navigate to the frontend directory and install frontend dependencies
                    // bat 'npm install --prefix frontend'
                    bat 'npm install --legacy-peer-deps --prefix frontend'
                    // Update browserslist DB
                    bat 'npx update-browserslist-db@latest --prefix frontend'

                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    // Build the frontend
                    bat 'npm run build --prefix frontend'
                    // bat 'npm install && npm install --prefix frontend && npm run build --prefix frontend'
                }
            }
        }

        // stage('Run Backend Tests') {
        //     steps {
        //         script {
        //             // Run backend tests (if any)
        //             bat 'npm test'
        //         }
        //     }
        // }

        // stage('Run Frontend Tests') {
        //     steps {
        //         script {
        //             // Run frontend tests (if any)
        //             bat 'npm test --prefix frontend'
        //         }
        //     }
        // }

        stage('Deploy') {
            steps {
                script {
                    // Add your deployment steps here
                    echo 'Deploying application...'
                    bat 'rmdir /s /q D:\\mern\\mern-chat-app\\jenkins-build'
                    bat 'xcopy /s /i /y build\\* D:\\mern\\mern-chat-app\\jenkins-build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Post-Build Actions') {
            steps {
                // Clean up workspace after pipeline execution
                cleanWs()
            }
        }
    }

}