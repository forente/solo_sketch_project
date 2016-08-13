var router = require('express').Router();
var path = require('path');
var fs = require('fs');

var User =  require('../models/user');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/createData', function(req, res){
  console.log('Adding new user!');

  var data = req.body;
  makeUserDir(data.username);
//console.log(data);

  var createdUser = new User({
    //TODO: get data from register page and create new user
    username:data.username,
    email:data.email,
    password:data.password

  });

  createdUser.save(function(err){
    if(err){
      console.log('Save Error: ',err);
      res.sendStatus(500);
    }
    else {

      res.sendStatus(200);
    }
  });
});
// makes a directory to store a users pictures 
 var makeUserDir = function(username){
   fs.mkdir('./userImages/'+username, function(err){
     if (err) {
       console.log(err);
     }
   });
 };



module.exports = router;
