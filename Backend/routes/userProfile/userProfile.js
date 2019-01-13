const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

//get profile by username
router.get("/getProfile/:username", requireAuth, function(req, res) {
  console.log("Inside getProfile Post Request");
  console.log("headers=", req.headers);

  kafka.make_request("getProfile_topic", req.params, function(err, result) {
    console.log("result=", result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in fetching user profile"
      });
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

//save or updates the user profile in database
router.post("/saveprofile/:username", requireAuth, (req, res) => {
  console.log("Inside saveprofile Post Request");
  console.log("Req Body : ", req.body);
  console.log(req.params.username);

  kafka.make_request(
    "saveProfile_topic",
    { body: req.body, params: req.params },
    function(err, result) {
      console.log(result);
      if (err) {
        res.json({
          status: "error",
          msg: "Error in saving traveler details."
        });
      } else {
        res.send(JSON.stringify(result));
      }
    }
  );
});

module.exports = router;
