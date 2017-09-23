const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
  const contractArtifact = require('../build/contracts/CredentialStore.json')
  const truffleContractFactory = require('truffle-contract')
  const CredentialStore = truffleContractFactory(contractArtifact)
  console.log(CredentialStore)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})