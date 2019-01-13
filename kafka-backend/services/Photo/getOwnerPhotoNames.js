var Property = require("../../../Backend/models/property");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Property.find(
    {
      username: msg.username
    },
    { photos: 1 }
  ).then(
    result => {
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, "Could not fetch property details.");
      }
    },
    err => {
      callback(err, "Error");
    }
  );
}

exports.handle_request = handle_request;
