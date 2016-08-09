var router =  require('express').Router();
var fs = require('fs');

router.get("/", function(req, res) {

  fs.writeFile("./userImages/test.txt", "Hey there", function(err){
    if(err){
      console.log(err);
    }
    console.log('The file was saved!');

  });
});

module.exports = router;
