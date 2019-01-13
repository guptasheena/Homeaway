var Property = require("../../../../Backend/models/property");
require("../../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Property.find(
    {
      bookingstatus: true,
      bookedby: msg.username
      // enddate: { $lte: new Date() }
    },
    function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        if (result.length !== 0) {
          callback(null, result);
        } else {
          callback(null, "Could not fetch property details.");
        }
      }
    }
  );
}

exports.handle_request = handle_request;
