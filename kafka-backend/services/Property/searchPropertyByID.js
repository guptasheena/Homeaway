var Property = require("../../../Backend/models/property");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Property.find({
    _id: msg.propertyID
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
