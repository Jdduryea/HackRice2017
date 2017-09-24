const express = require('express')
const app = express()
const bodyParser= require('body-parser')
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
  const contractArtifact = require('../build/contracts/CredentialStore.json')
  const truffleContractFactory = require('truffle-contract')
  const CredentialStore = truffleContractFactory(contractArtifact)
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

app.post('/student', (req, res) => {
 console.log(req.body)
})

app.post('/send_info', (req, res) => {
 console.log(req.body)
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})