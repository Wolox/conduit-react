@Library('wolox-ci') _

cypress {

  checkout scm

  woloxCi('.cypress/config.yml');
}

node {

  checkout scm

  woloxCi('.woloxci/config.yml');
}