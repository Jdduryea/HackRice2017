const express = require('express')
const app = express()
const bodyParser= require('body-parser')
//app.set('view engine', 'ejs')

app.get('/', function(req, res){
  try{

    res.render('index.ejs');
}
catch(er){
  console.log(er)
}

})

app.use(express.static(__dirname + '/static'));

app.get('/university', function(req, res){
  try{
    //res.sendFile(__dirname + '/university.html')
  const contractArtifact = require('../build/contracts/CredentialStore.json')
  const truffleContractFactory = require('truffle-contract')
  const CredentialStore = truffleContractFactory(contractArtifact)
  //console.log(CredentialStore)
  	var students = [
        { name: 'Kunal Shah', field_of_study: 'Computer Science', degree_type: 'BA', complete: false, year: 2018},
        { name: 'Johnathon Berry', field_of_study: 'Mechanical Engineering', degree_type: 'BA', complete: false, year: 2020}

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