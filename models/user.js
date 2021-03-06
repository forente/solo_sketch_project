var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({

  username: {type:String, required:true, index: {unique:true}},
  email: {type:String, required:true},
  password: {type:String, required:true},
  imageLoc:{type:[String]}
});

userSchema.pre('save', function(next){
  var user = this;

  if(!user.isModified('password')){
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){

    if(err){
      return next();
    }
    bcrypt.hash(user.password, salt, function(err,hash){
      if(err){
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
  console.log('hit compare');
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){
      console.log(err);
      return cb(err);
    }
    else {
      console.log('no error!', isMatch);
      cb(null, isMatch);
    }

  });
};

module.exports = mongoose.model('User',userSchema);
