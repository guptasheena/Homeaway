const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var Users = require("../../../Backend/models/user");
const dbKey = require("../../../Backend/config/keys");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Users.findOne(
    {
      username: msg.username
    },
    function(err, user) {
      if (err) {
        callback(err, "Error");
      } else {
        if (user !== null) {
          bcrypt.compare(msg.password, user.password, function(err, isMatch) {
            if (isMatch) {
              console.log("username=", user.username);
              var data = { username: user.username };

              jwt.sign(
                data,
                dbKey.secretOrKey,
                { expiresIn: 600000 },
                (err, token) => {
                  const newToken = "Bearer " + token;
                  console.log("token=", newToken);
                  callback(null, newToken);
                }
              );
            } else {
              console.log("Username and/or Password is incorrect.");
              callback(null, []);
            }
          });
        } else {
          console.log("Username and/or Password is incorrect.");
          callback(null, []);
        }
      }
    }
  );
}

exports.handle_request = handle_request;
