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
  console.log("something is wrong");
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



app.get('/university', async function(req, res){
  try{
    res.render('universite.ejs', {
      universityAddr: req.body.universityAddr, 
      universityName: req.body.universityName, 
      students: req.body.students
    });
}
catch(er){
	console.log(er)
}

})


app.use(bodyParser.urlencoded({extended: true}))


app.post('/send_info_university', async (req, res) => {
  // Write thing
  // REturn array
  var contractInstance = await CredentialStore.deployed();
  
  var infoObj = {};

  infoObj.name = req.body.name;
  infoObj.degree_type = req.body.degree_type;
  infoObj.completed = (req.body.completed == "true");
  infoObj.field_of_study = req.body.field_of_study;
  infoObj.year = parseInt(req.body.year);
  infoObj.gpa = parseInt(req.body.gpa);

  var universityAddr = req.body.universityAddr;

  var studentAddr = await contractInstance.getStudentAddr.call(infoObj.name);

  // console.log(studentAddr);
  // console.log(infoObj);
  // console.log(req.body.universityAddr);

  await contractInstance.updateDegreeType(studentAddr, infoObj.degree_type, {from: universityAddr});  
  await contractInstance.updateCompleted(studentAddr, infoObj.completed, {from: universityAddr});  
  await contractInstance.updateYearOfGraduation(studentAddr, infoObj.year, {from: universityAddr});  
  await contractInstance.updateFieldOfStudy(studentAddr, infoObj.field_of_study, {from: universityAddr});  
  await contractInstance.updateGPA(studentAddr, infoObj.gpa, {from: universityAddr});  

  // await contractInstance.update(
  //   studentAddr, 
  //   infoObj.degree_type, 
  //   infoObj.completed, 
  //   infoObj.year,
  //   infoObj.field_of_study,
  //   infoObj.gpa,
  //   {from: req.body.universityAddr}
  // );

  res.render('universite.ejs', {
    universityAddr: universityAddr, universityName: req.body.universityName, students: [infoObj]
  });
 
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

  // console.log(infoObj); 
  res.render('student.ejs', {info: [infoObj]});
})

app.post('/auth_post', async (req, res) => {
 var univAddr = req.body.private_key;
 var contractInstance = await CredentialStore.deployed();
 var universityName = await contractInstance.accreditedUniversities.call(univAddr);
 // console.log(universityName);
 var students = [
        { name: 'Kunal Shah', degree_type: 'BA', completed: false, year: 2018, field_of_study: 'Computer Science', gpa: 400},
        { name: 'Johnathon Berry', degree_type: 'BA', completed: false, year: 2020, field_of_study: 'Mechanical Engineering', gpa: 220},
   ];
 res.render('universite.ejs', {universityAddr: univAddr, universityName: universityName, students : students})
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})







