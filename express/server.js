const express = require('express')
const app = express()
const bodyParser= require('body-parser')

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

app.post('/student', (req, res) => {
 console.log(req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})