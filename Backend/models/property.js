const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  username: String,
  country: String,
  streetaddress: String,
  building: String,
  city: String,
  state: String,
  zipcode: Number,
  headline: String,
  description: String,
  type: String,
  bedrooms: Number,
  accommodates: Number,
  bathrooms: Number,
  photos: String,
  startdate: Date,
  enddate: Date,
  currency: String,
  nightlyrate: Number,
  minimumstay: Number,
  cleaningfee: Number,
  pets: String,
  bookingstatus: Boolean,
  bookedby: String
});

module.exports = mongoose.model("property", propertySchema, "property");
