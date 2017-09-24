const express = require('express')
const app = express()
const bodyParser= require('body-parser')

// var fs = require('fs')
// var contractJSON = JSON.parse(fs.readFileSync('../build/contracts/CredentialStore.json'))
// var accountConfig = JSON.parse(fs.readFileSync('../build/accounts.json'))

// var Web3 = require('web3')
// var web3provider = new Web3.providers.HttpProvider("http://localhost:8545")
// var contract = require('truffle-contract')

// var CredentialStore = contract(contractJSON)
// CredentialStore.setProvider(web3provider)

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



app.get('/university', function(req, res){
  try{
    //res.sendFile(__dirname + '/university.html')
  //console.log(CredentialStore)
  	var students = [
        { name: 'Kunal Shah', degree_type: 'BA', completed: false, year: 2018, field_of_study: 'Computer Science', gpa: 400},
        { name: 'Johnathon Berry', degree_type: 'BA', completed: false, year: 2020, field_of_study: 'Mechanical Engineering', gpa: 220},


    ];

    res.render('universite.ejs', {
        address: address, students: students
    });
}
catch(er){
	console.log(er)
}

})


app.use(bodyParser.urlencoded({extended: true}))


app.post('/send_info_university', (req, res) => {
  // Write thing
  // REturn array
  var students = [];
  res.render('universite.ejs', {
        address: address, students: students
    });
 
})

app.post('/auth_post', (req, res) => {
 console.log(req.body)
 // var private_key = document.getElementById('private_key').value;
 // console.log(private_key);

 // var univ = instance.accreditedUniversities.call(accountConfig.universities[0]);

 // console.log("univ: " + univ);
 //  return univ;
 var public_address = 'asdf'
 var students = [
        { name: 'Kunal Shah', degree_type: 'BA', completed: false, year: 2018, field_of_study: 'Computer Science', gpa: 400},
        { name: 'Johnathon Berry', degree_type: 'BA', completed: false, year: 2020, field_of_study: 'Mechanical Engineering', gpa: 220},


   ];
 res.render('universite.ejs', {address: public_address, students : students})
})



app.post('/send_info_student', (req, res) => {
  var studentKey = req.body.candidate_key;
  //var instancePromise = CredentialStore.deployed();
  //var studentName = instancePromise.then((instance) => instance.studentMap[studentKey].name.call());
  //var studentName = instancePromise.then((instance) => instance.studentMap[studentKey].name.call());
  var studentName = studentKey
  var studentDegType = "Some Degree"
  var completed = true
  var field_of_study = "Field Of Study"
  var year = 2222
  var gpa = "GPA"
  var info = [{name : studentName, degree_type: studentDegType, completed : completed, field_of_study: field_of_study,
  year: year, gpa: gpa}];
  res.render('student.ejs', {info: info});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})







