const express = require('express')
const app = express()
const bodyParser= require('body-parser')

<<<<<<< HEAD
//app.set('view engine', 'ejs')

app.get('/', function(req, res){
  try{
    //res.sendFile(__dirname + '/university.html')
  const contractArtifact = require('../build/contracts/CredentialStore.json')
  const truffleContractFactory = require('truffle-contract')
  const CredentialStore = truffleContractFactory(contractArtifact)
  //console.log(CredentialStore)
  	var students = [
        { name: 'asdf', did_graduate: 'Y'},
        { name: 'jkl;', did_graduate: 'N' }
    ];

    res.render('universite.ejs', {
        students: students
    });
}
catch(er){
	console.log(er)
}

})


app.use(bodyParser.urlencoded({extended: true}))

// app.post('/student', (req, res) => {
//   console.log(req.body)
// })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
=======
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
>>>>>>> 45276af0e2b9a44fd125078d37fc9fa8e953a8cb
})