var Inbox = require("../../../Backend/models/inbox");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  var inbox = new Inbox({
    message: msg.message,
    askedBy: msg.askedBy,
    askedTo: msg.askedTo,
    propertyID: msg.propertyID,
    type: "question"
  });

  inbox.save().then(
    result => {
      callback(null, result);
    },
    err => {
      callback(err, "Error");
    }
  );
}

exports.handle_request = handle_request;
