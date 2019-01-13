var Users = require("../../../Backend/models/user");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Users.findOne({
    username: msg.username
  }).then(
    result => {
      callback(null, result);
    },
    err => {
      callback(err, "Error");
    }
  );
}

exports.handle_request = handle_request;
