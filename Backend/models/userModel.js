const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    validate: [validator.isEmail, "Give correct form of email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: [8, "Password must be of atleast 8 characters"],
    select: false,
  },
  passwordChangedAt: Date,
  passwordConfirm: {
    type: String,
    required: [true, "The passwords do not match"],
    minLength: [8, "The passwords do not match"],
    validate: [
      function (el) {
        return el === this.password;
      },
      "The passwords do not match",
    ],
  },
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
})

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User',userSchema);
module.exports = User;