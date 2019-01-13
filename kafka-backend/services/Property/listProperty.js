var Property = require("../../../Backend/models/property");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  var property = new Property({
    username: msg.params.username,
    country: msg.body.country,
    streetaddress: msg.body.streetaddress,
    building: msg.body.building,
    city: msg.body.city,
    state: msg.body.state,
    zipcode: msg.body.zipcode,
    headline: msg.body.headline,
    description: msg.body.description,
    type: msg.body.type,
    bedrooms: msg.body.bedrooms,
    accommodates: msg.body.accommodates,
    bathrooms: msg.body.bathrooms,
    photos: msg.body.photos,
    startdate: msg.body.startdate,
    enddate: msg.body.enddate,
    currency: msg.body.currency,
    nightlyrate: msg.body.nightlyrate,
    minimumstay: msg.body.minimumstay,
    cleaningfee: msg.body.cleaningfee,
    pets: msg.body.pets,
    bookingstatus: false,
    bookedby: null
  });

  property.save().then(
    result => {
      callback(null, result);
    },
    err => {
      callback(err, "Error");
    }
  );
}

exports.handle_request = handle_request;
