var router = require('express').Router();
var passport = require('passport');
var path = require('path');

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/login.html'));
});

router.get('/', function(req, res, next){
  res.send(req.isAuthenticated())
});

router.post('/', passport.authenticate('local', {

    successRedirect:'/views/main.html',
    failureRedirect:'/views/login.html'
  })
);

module.exports = router;
