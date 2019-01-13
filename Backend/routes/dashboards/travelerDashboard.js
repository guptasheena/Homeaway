const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

//returns properties for traveler dashboard
router.get("/getTravelerDashboardProperty/:username", requireAuth, function(
  req,
  res
) {
  console.log("Inside getTravelerDashboardProperty Get Request");

  kafka.make_request("getTravelerDashboard_topic", req.params, function(
    err,
    result
  ) {
    console.log(result);
    if (err) {
      res.json({
        status: "error",
        msg: "Could not fetch property details."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

//returns traveler dashboard property by property headline
router.get(
  "/searchTravelerPropertyByName/:name/:username",
  requireAuth,
  function(req, res) {
    console.log("Inside searchTravelerPropertyByName Get Request");

    kafka.make_request("searchTravelerDashboard_topic", req.params, function(
      err,
      result
    ) {
      console.log("result=", result);
      if (err) {
        res.json({
          status: "error",
          msg: "Could not fetch property details."
        });
      } else {
        res.send(JSON.stringify(result));
      }
    });
  }
);

module.exports = router;
