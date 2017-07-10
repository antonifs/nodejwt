const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define Model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// run this before a function before saving
userSchema.pre('save', function(next) {

  // get access to the user model
  const user = this;

  // generate salt and then run callback
  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) { return next(err); }

      // ovewrite the plain text with encrypted password
      user.password = hash;

      // go ahead you now can save the user to model
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
