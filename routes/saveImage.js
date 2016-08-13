var router =  require('express').Router();
var fs = require('fs');
var User = require('../models/user');

router.post("/", function(req, res) {
  //console.log(req.body);
  var data = req.body;

  var photoBody = data.photo.replace(/^data:image\/png;base64,/,"");
  var imageBuffer = new Buffer(photoBody, 'base64');
  var filePath = "./userImages/" +data.username+"/"+data.imageName + ".png";


  fs.writeFile(filePath, imageBuffer, function(err){
    if(err){
      console.log(err);
    }
    console.log('The file was saved!');

  });

  User.findOneAndUpdate({username:data.username}, {$addToSet:{imageLoc:filePath}}, function(err,doc){
    if(err){
      console.log(err);
    }
  });
});



module.exports = router;
