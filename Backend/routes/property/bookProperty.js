const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.get("/bookProperty/:propertyID/:username", requireAuth, function(
  req,
  res
) {
  console.log("Inside bookProperty GET Request");

  kafka.make_request("bookProperty_topic", req.params, function(err, result) {
    console.log(result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in booking property."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
