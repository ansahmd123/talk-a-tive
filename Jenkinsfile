pipeline {
    agent any

    environment {
        BROWSERSLIST_IGNORE_OLD_DATA = 'true'
    }

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
                    bat 'npm install --prefix frontend'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    bat 'npm run build --prefix frontend'
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
                    // first delete the existing artifacts
                    // bat 'rmdir /s /q D:\\mern\\mern-chat-app\\frontend\\jenkins-build'
                    // bat 'xcopy /s /i /y frontend\\build\\* D:\\mern\\mern-chat-app\\frontend\\jenkins-build'
                    bat 'npm start'
                    bat 'npm run test:playwright --prefix frontend'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'frontend\\build\\**', fingerprint: true, onlyIfSuccessful: true
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