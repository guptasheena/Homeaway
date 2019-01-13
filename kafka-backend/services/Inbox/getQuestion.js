var Inbox = require("../../../Backend/models/inbox");
require("../../../Backend/database/mongoose");

function handle_request(msg, callback) {
  Inbox.find({
    $or: [{ askedTo: msg.username }, { askedBy: msg.username }],
    type: "question"
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
