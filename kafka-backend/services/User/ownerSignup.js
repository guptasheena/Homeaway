const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Users = require("../../../Backend/models/user");
const dbKey = require("../../../Backend/config/keys");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Users.findOne(
    {
      $and: [
        { username: msg.body.username },
        { username: msg.params.current_user }
      ]
    },
    function(err, user) {
      if (err) {
        callback(err, "Error");
      } else {
        if (user !== null) {
          bcrypt.compare(msg.body.password, user.password, function(
            err,
            isMatch
          ) {
            if (isMatch) {
              Users.update(
                { username: msg.body.username },
                { $set: { isowner: true } },
                function(err, result) {
                  if (err) {
                    callback(err, "Error");
                  } else {
                    var data = { username: msg.body.username };

                    jwt.sign(
                      data,
                      dbKey.secretOrKey,
                      { expiresIn: 600000 },
                      (err, token) => {
                        const newToken = "Bearer " + token;
                        callback(null, newToken);
                      }
                    );
                  }
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
