var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb://sheena:sheena123@ds237660.mlab.com:37660/homeaway_lab2"
    // { poolSize: 100 }
  )
  .then(() => console.log("Connected to Mongo DB"))
  .catch(err => console.log("Error in connecting to Mongo DB ", err));

module.exports = { mongoose };
