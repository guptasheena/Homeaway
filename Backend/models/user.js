const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  photo: String,
  about: String,
  city: String,
  company: String,
  school: String,
  hometown: String,
  languages: String,
  gender: String,
  phone: Number,
  isowner: Boolean,
  creationyear: Number
});

module.exports = mongoose.model("traveler", userSchema, "traveler");
