const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
    },
  email: {
    type: String,
    trim: true,
    required: true
    },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

// virtual field

userSchema
  .virtual("password")
  .set(function(password) {
  // create temporary variable called password
  this._password = password;
  // generate a timestamp
  this.salt = uuidv1();
  // encrypt password 
  this.hashed_password = this.encryptPassword(password);
})
.get(function(){
  return this._password;
});

// methods - create a one-way hash for the password. 
// passwords are not stored in the database this way.

userSchema.methods = {
  authenticate: function(plainText){
    return this.encryptPassword(plainText) == this.hashed_password;
  },
  encryptPassword: function(password){
    if(!password) return "";
    try {
      return crypto
      .createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');      
    } catch(err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);