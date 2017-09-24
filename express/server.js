const express = require('express')
const app = express()
const bodyParser= require('body-parser')

var fs = require('fs')
var contractJSON = JSON.parse(fs.readFileSync('../build/contracts/CredentialStore.json'))
var accountConfig = JSON.parse(fs.readFileSync('../build/accounts.json'))

var Web3 = require('web3')
var web3provider = new Web3.providers.HttpProvider("http://localhost:8545")
var contract = require('truffle-contract')

var CredentialStore = contract(contractJSON)
CredentialStore.setProvider(web3provider)

//app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  try{

    res.render('index.ejs');
}
catch(er){
  console.log(er)
}

})

app.get('/auth', function(req, res){
  try{

    res.render('auth.ejs');
}
catch(er){
  console.log(er)
}

})

app.get('/student', function(req, res){
  try{


    res.render('student.ejs');
}
catch(er){
  console.log(er)
}

})



app.get('/university', function(req, res){
  try{
    //res.sendFile(__dirname + '/university.html')
  //console.log(CredentialStore)
  	var students = [
        { name: 'Kunal Shah', degree_type: 'BA', completed: false, year: 2018, field_of_study: 'Computer Science', gpa: 400},
        { name: 'Johnathon Berry', degree_type: 'BA', completed: false, year: 2020, field_of_study: 'Mechanical Engineering', gpa: 220},


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

app.post('/send_info_university', (req, res) => {
 
})

app.post('/send_info_student', (req, res) => {
  var studentKey = req.body.candidate_key;
  console.log(studentKey);
  var instancePromise = CredentialStore.deployed();
  var studentName = instancePromise.then((instance) => instance.studentMap[studentKey].name.call());
  console.log(studentName)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})