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

// app.set('view engine', 'ejs')

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

    var info = [{name : "", degree_type: "",
   completed : false, field_of_study: "",
  year: 0, gpa: ""}];
    res.render('student.ejs', {info: info});
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

app.post('/send_info_student', async (req, res) => {
  // var studentKey = req.body.candidate_key;
  var studentKey = accountConfig.students[0];
  // var uniName = req.body.candidate_name;
  var uniName = "Rice University";

  var infoObj = {};
  
  var contractInstance = await CredentialStore.deployed();
  infoObj.name = await contractInstance.getName.call(studentKey);
  infoObj.degree_type = await contractInstance.getDegreeType.call(studentKey, uniName);
  infoObj.completed = await contractInstance.getCompleted.call(studentKey, uniName);
  infoObj.year = await contractInstance.getDegreeType.call(studentKey, uniName);
  infoObj.field_of_study = await contractInstance.getFieldOfStudy.call(studentKey, uniName);
  infoObj.gpa = await contractInstance.getGPA.call(studentKey, uniName);
  // .then((instance) => contractInstance = instance)
  // .then(() => contractInstance.getName.call("0x69cfd1268d7bb3ed1a880be325d1f94250a29715"))
  // .then((result) => name = result);

  console.log(infoObj); 

  // .then(() => contractInstance.getDegreeType.call(studentKey, uniName))
  // .then((degreeType) => studentDegType = degreeType)
  // .then(() => contractInstance.getCompleted.call(studentKey, uniName))
  // .then((completedBool) => completedFlag = completedBool)
  // .then(() => contractInstance.getDegreeType.call(studentKey, uniName))
  // .then((result) => gradYear = result)
  // .then(() => contractInstance.getFieldOfStudy.call(studentKey, uniName))
  // .then((result) => fieldOfStudy = result)
  // .then(() => contractInstance.getGPA.call(studentKey, uniName))
  // .then((result) => gpaStat = result);

  // var info = [{name : studentName, degree_type: studentDegType, completed : completedFlag, year: gradYear, field_of_study: fieldOfStudy, gpa: gpaStat}];
  // console.log(info);
  res.render('student.ejs', {info: [infoObj]});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})