const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {createSaltHash, checkSaltHash} = require("../lib/cryptoPass");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    private: true
  },
  salt: {
    type: String,
    private: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    createSaltHash(user.password).then(result => {
      user.password = result.hash;
      user.salt = result.salt;
      next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(passw, next) {
  checkSaltHash(passw, this.salt, this.password)
    .then(result => next(null, result))
    .catch(err => next(err));
};

module.exports = mongoose.model("users", userSchema);
