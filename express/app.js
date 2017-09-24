const express = require('express')
const app = express()

const fs = require('fs')
const config = JSON.parse(fs.readFileSync('../config.json'));

const Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:"+config.ports.testrpc));

const address = '0xa7cb6015301786655b6fc1eb1b6e174df117b7de';
const owner = '0x0f7d5c57d47c5d345dff92fd9322496622ef2923';

const contractJSON = JSON.parse(fs.readFileSync('../build/contracts/CredentialStore.json'));
var CredentialStore = new web3.eth.Contract(contractJSON.abi, address, {from: owner});

// CredentialStore.methods()

console.log(CredentialStore.methods);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(config.ports.express, function () {
  console.log('Example app listening on port '+config.ports.express+'!')
})