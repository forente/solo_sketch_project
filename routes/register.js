var router = require('express').Router();
var path = require('path');

var User =  require('../models/user');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/createData', function(req, res){
  console.log('Adding new user!');
  var data = req.body;

  var createdUser = new User({
    //TODO: get data from register page and create new user
  });
});

module.exports = router;
