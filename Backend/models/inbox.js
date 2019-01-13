const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema({
  message: String,
  askedBy: String,
  askedTo: String,
  propertyID: String,
  type: String
});

module.exports = mongoose.model("inbox", inboxSchema, "inbox");
