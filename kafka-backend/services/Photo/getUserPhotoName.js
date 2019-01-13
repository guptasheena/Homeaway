var Users = require("../../../Backend/models/user");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Users.findOne(
    {
      username: msg.username
    },
    { photo: 1 }
  ).then(
    result => {
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, "Error in fetching user profile");
      }
    },
    err => {
      callback(err, "Error");
    }
  );
}

exports.handle_request = handle_request;
