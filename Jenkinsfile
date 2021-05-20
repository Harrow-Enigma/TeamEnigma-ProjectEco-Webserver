pipeline {
  agent any
    
  tools {nodejs "nodejs"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/DylanK46/TeamEngima-ProjectEco-Webserver.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
         sh '<<Build Command>>'
      }
    }  
    
            
    stage('Deploy') {
      steps {
        sh 'node .'
      }
    }
  }
}
