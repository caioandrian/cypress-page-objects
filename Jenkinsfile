pipeline{
    agent{
        docker {
            image 'cypress/base:latest'
        }
    }
    stages{
        stage('Setup'){
            steps{
                sh "npm ci"
            }
        }
        stage('Tests'){
            steps{
                sh "npm run test"
            }
        }
    }
    post{
        always{
            script {
                cucumber fileIncludePattern: "**/*.json", jsonReportDirectory: "report", sortingMethod: "ALPHABETICAL"
            }
        }
        
    }
}