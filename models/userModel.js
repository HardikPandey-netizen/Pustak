const mongoose = require("mongoose");
const validator = require("validator");
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
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
});

const User = mongoose.model('User',userSchema);
module.exports = User;