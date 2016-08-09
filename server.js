var express = require('express');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var localStrategy = require('passport-local');

var login = require('./routes/login');
var register = require('./routes/register');

var test = require('./routes/test');
var mainPage = require('./routes/mainPage');
var saveImage = require('./routes/saveImage');
var User = require('./models/user');

var app =  express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

app.use(session({
  secret:'gosHawk',
  key:'user',
  resave:true,
  saveUninitialized:false,
  cookie:{ maxAge:800000, secure:false}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({usernameField:'username', passwordField: 'password'},
  function (username, password, done){
    console.log(done);
    User.findOne({ username:username }, function(err, user){
      if(err){
        console.log('Error in findOne server:', err);
      }
      if(!user){
        return done(null, false);
      }

      user.comparePassword(password, function(err, isMatch){
          if(err){
            console.log('Error in compare passwords: ',err);
          }
          if (isMatch){
            return done(null, user);
          }
          else {
            done(null, false);
          }
      });
    });
  })
);

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      console.log(id);
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
app.use('/main', mainPage);
app.use('/test',test);
app.use('/save',saveImage);

var db = mongoose.connect('mongodb://localhost/doodleUsers').connection;

db.once('open', function() {
  console.log('Connected to MongoDB');
});



var port =  process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log("SparrowHawk listening on port:", server.address().port);
});
