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

        stage('Deploy') {
            steps {
                script {
                    // Add your deployment steps here
                    echo 'Deploying application...'
                    bat 'start /B cmd /c "npm start"'
                    // Wait for the server to be up and running
                    bat '''
                    echo Waiting for the server to start...
                    for /L %%i in (1,1,30) do (
                        powershell -Command "try { (Invoke-WebRequest -Uri http://localhost:5000 -UseBasicParsing).StatusCode } catch { $_.Exception.Response.StatusCode }" | findstr "200" && exit /b 0
                        timeout /t 2 >nul
                    )
                    echo Server did not start within the expected time.
                    exit /b 1
                    '''
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                script {
                    bat 'npm run playwright:install --prefix frontend'
                    // Run Playwright tests
                    bat 'npm run test:playwright --prefix frontend'
                }
            }
        }

        stage('Stop Server') {
            steps {
                script {
                    // Stop the server by killing the process
                    bat '''
                    echo Stopping the server...
                    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
                        if "%%a" neq "0" (
                            taskkill /F /PID %%a
                        )
                    )
                    '''
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