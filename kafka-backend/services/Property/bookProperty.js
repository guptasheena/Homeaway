var Property = require("../../../Backend/models/property");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Property.update(
    { _id: msg.propertyID },
    {
      $set: {
        bookingstatus: true,
        bookedby: msg.username
      }
    },
    function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
