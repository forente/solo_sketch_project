var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

module.exports = router;
