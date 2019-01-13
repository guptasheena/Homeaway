var kafka = require("../../kafka/client");
const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var express = require("express");
const router = express.Router();

//search properties based on user input
router.post("/searchProperty/:username", requireAuth, function(req, res) {
  console.log("Inside searchProperty Post Request");
  console.log(req.body);

  kafka.make_request(
    "searchProperty_topic",
    { params: req.params, body: req.body },
    function(err, result) {
      console.log("result=", result);
      if (err) {
        res.json({
          status: "error",
          msg: "Error in fetching property details"
        });
      } else {
        res.status(200).send(JSON.stringify(result));
      }
    }
  );
});

//search property by property ID
router.get("/searchPropertyByID/:propertyID", requireAuth, function(req, res) {
  console.log("Inside searchPropertyByID GET Request");
  console.log(req.params.propertyID);

  kafka.make_request("searchPropertyByID_topic", req.params, function(
    err,
    result
  ) {
    console.log("result=", result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in fetching property details"
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
