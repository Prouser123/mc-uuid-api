// Scripted Pipeline
// Requires libraries from https://github.com/Prouser123/jenkins-tools
// Made by @Prouser123 for https://ci.jcx.ovh.

node('docker-cli') {
  cleanWs()
  
  postJobGhStatus() {
    scmCloneStage()

    // If on the master branch, deploy with GitHub status checks enabled.
    deployStage(true)
  }
}