var express = require('express');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var localStrategy = require('passport-local');

var login = require('./routes/login');
var register = require('./routes/register');
var User = require('./models/user');

var app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret:'gosHawk',
  key:'user',
  resave:true,
  saveUninitialized:false,
  cookie:{ maxAge:800000, secure:false}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({ passReqTOCallback: true, usernameField:'username'},
  function (req, username, password, done){

    User.findone({ username:username }, function(err, user){
      if(err){
        console.log('Error in findOne server:', err);
      }
      if(!user){
        return done(null, false, {message:'Incorrect username or Password'});
      }

      user.comparePassword(password, function(err, isMatch){
          if(err){
            console.log('Error in compare passwords: ',err);
          }
          if (isMatch){
            return done(null, user);
          }
          else {
            done(null, false, {message:'Incorrect username or Password'});
          }
      });
    });
  })
);

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(user, done){
  User.findById(id, function(err, user){
    if(err){
      return done(err);
    }
    done(null, user);
  });
});


app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});
app.use('/login',login);
app.use('/register',register);

var db = mongoose.connect('mongodb://localhost/doodleUsers').connection;

db.once('open', function() {
  console.log('Connected to MongoDB');
});



var port =  process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log("SparrowHawk listening on port:", server.address().port);
});
