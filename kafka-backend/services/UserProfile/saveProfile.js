var Users = require("../../../Backend/models/user");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Users.update(
    { username: msg.params.username },
    {
      $set: {
        firstname: msg.body.firstname,
        lastname: msg.body.lastname,
        about: msg.body.about,
        city: msg.body.city,
        company: msg.body.company,
        school: msg.body.school,
        hometown: msg.body.hometown,
        languages: msg.body.languages,
        gender: msg.body.gender,
        phone: msg.body.phone,
        photo: msg.body.photo
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
