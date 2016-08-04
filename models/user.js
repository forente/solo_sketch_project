var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({

  username: {type:String, required:true, index: {unique:true}},
  email: {type:String, required:true},
  password: {type:String, required:true}
});



module.exports = mongoose.model('User',userSchema);
