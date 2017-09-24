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
  	// var students = [
   //      { name: 'Kunal Shah', degree_type: 'BA', completed: false, year: 2018, field_of_study: 'Computer Science', gpa: 400},
   //      { name: 'Johnathon Berry', degree_type: 'BA', completed: false, year: 2020, field_of_study: 'Mechanical Engineering', gpa: 220},


   //  ];

    res.render('universite.ejs', {
        address: address
    });
}
catch(er){
	console.log(er)
}

})


app.use(bodyParser.urlencoded({extended: true}))


app.post('/send_info_university', (req, res) => {
 console.log(req.body)
})

app.post('/auth_post', (req, res) => {
 console.log(req.body)
 // var private_key = document.getElementById('private_key').value;
 // console.log(private_key);

 // var univ = instance.accreditedUniversities.call(accountConfig.universities[0]);

 // console.log("univ: " + univ);
 //  return univ;
 var public_address = 'asdf'
 res.render('universite.ejs', {address: public_address})
})


app.post('/send_info_student', (req, res) => {
  console.log(req.body)
  // var univ = await instance.accreditedUniversities.call(accountConfig.universities[0])
  

  // var student = await instance.studentMap.call(accountConfig.universities[0])
  // var name = student.name
  // var univ_map = student.
  // student.universityMap[univ_name]
  

  // var gpa = await instance.
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})







