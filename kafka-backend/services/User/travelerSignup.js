const bcrypt = require("bcrypt");
var Users = require("../../../Backend/models/user");
require("../../../Backend/database/mongoose");
const saltRounds = 10;

function handle_request(msg, callback) {
  var today = new Date();
  var year = today.getFullYear();

  bcrypt.hash(msg.password, saltRounds, function(err, hash) {
    var user = new Users({
      username: msg.username,
      password: hash,
      firstname: msg.firstname,
      lastname: msg.lastname,
      creationyear: year
    });

    user.save().then(
      user => {
        console.log("Traveler Sign-up successful.");
        callback(null, "Traveler Sign-up successful.");
      },
      err => {
        console.log("Username and/or Password is incorrect.");
        callback(null, []);
      }
    );
  });
}

exports.handle_request = handle_request;
