var express = require('express')
var app = express()

var fs = require('fs')
var contractJSON = JSON.parse(fs.readFileSync('./build/contracts/CredentialStore.json'))
var accountConfig = JSON.parse(fs.readFileSync('./build/accounts.json'))

var Web3 = require('web3')
var web3provider = new Web3.providers.HttpProvider("http://localhost:8545")
var contract = require('truffle-contract')

var CredentialStore = contract(contractJSON)
CredentialStore.setProvider(web3provider)

return CredentialStore.deployed()
.then(async (instance) => {
	var name = await instance.accreditedUniversities.call(accountConfig.universities[0])
	console.log(name)
	tx = await instance.authorizeUniversity(accountConfig.universities[0], "RICE UNIVERSITY CHANGED!", {from: accountConfig.owner})
	console.log(tx)
	var name = await instance.accreditedUniversities.call(accountConfig.universities[0])
	console.log(name)
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})