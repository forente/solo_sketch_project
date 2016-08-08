var router = require('express').Router();
var passport = require('passport');
var path = require('path');

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/main.html'));
});



module.exports = router;
