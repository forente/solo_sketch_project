var router =  require('express').Router();
var fs = require('fs');

router.post("/", function(req, res) {
  //console.log(req.body);
  var photoBody = req.body.photo.replace(/^data:image\/png;base64,/,"");
  var imageBuffer = new Buffer(photoBody, 'base64')
  fs.writeFile("./userImages/" +req.body.imageName + ".png", imageBuffer, function(err){
    if(err){
      console.log(err);
    }
    console.log('The file was saved!');

  });
});

module.exports = router;
