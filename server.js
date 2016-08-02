var express = require('express');
var path = require('path');

var login = require('./routes/login');
var register = require('./routes/register');

var app =  express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});
app.use('/login',login);
app.use('/register',register);





var port =  process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log("SparrowHawk listening on port:", server.address().port);
});
