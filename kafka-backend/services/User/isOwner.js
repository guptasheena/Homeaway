const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Users = require("../../../Backend/models/user");
const dbKey = require("../../../Backend/config/keys");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Users.findOne(
    {
      username: msg.username,
      isowner: true
    },
    function(err, user) {
      if (err) {
        callback(err, "Error");
      } else {
        if (user !== null) {
          callback(null, user);
        } else {
          console.log("No Owner found");
          callback(null, []);
        }
      }
    }
  );
}

exports.handle_request = handle_request;
