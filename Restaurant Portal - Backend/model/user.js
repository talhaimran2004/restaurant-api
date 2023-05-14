const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username cannot be blank"],
    trim: true,
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    require: [true, "User Email cannot be blank"],
    trim: true,
    unique: [true, "Email must be unique"]
  },
  password: {
    type: String,
    require: [true, "User Price cannot be blank"],
    trim: true,
  },
  profileImage: {
    type: String,
    data: Buffer,
    contentType: String,
    require: [true, "User Profile Image cannot be blank"],
  },
});

module.exports = mongoose.model("Users", userSchema);
