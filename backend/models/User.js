const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter a name!"],
  },
  email: {
    type: String,
    required: [true, "Enter an email!"],
    unique: [true, "Enter a unique email!"],
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter a password!"],
    min: [5, "Enter minimum 5 character in password"],
    max: [8, "Enter maximum 8 character in password"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
