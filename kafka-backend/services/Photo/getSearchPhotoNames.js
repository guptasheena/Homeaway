var Property = require("../../../Backend/models/property");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Property.find(
    {
      country: msg.body.location,
      startdate: { $lte: msg.body.arrivedate },
      enddate: { $gte: msg.body.departdate },
      accommodates: { $gte: msg.body.guests },
      bookingstatus: false,
      username: { $ne: msg.params.username }
    },
    { photos: 1 }
  )
    .collation({ locale: "en", strength: 2 })
    .then(
      result => {
        console.log("resultphoto=", result);
        if (result.length !== 0) {
          callback(null, result);
        } else {
          callback(null, "Error in fetching property details");
        }
      },
      err => {
        callback(err, "Error");
      }
    );
}

exports.handle_request = handle_request;
