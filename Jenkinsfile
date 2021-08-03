@Library('wolox-ci') _
pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    stage('build and test') {


      steps {
        sh 'npm ci'
        sh "npm run test:ci:record"
      }
    }
  }
}

node {

  checkout scm

  woloxCi('.woloxci/config.yml');
}
