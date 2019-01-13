const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

//returns all properties belonging to the user who is currently logged-in
router.get("/getOwnerDashboardProperty/:username", requireAuth, function(
  req,
  res
) {
  console.log("Inside getOwnerDashboardProperty Get Request");
  kafka.make_request("getOwnerDashboard_topic", req.params, function(
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
      res.status(200).send(JSON.stringify(result));
    }
  });
});

//returns owner dashboard property by headline
router.get("/searchOwnerPropertyByName/:name/:username", requireAuth, function(
  req,
  res
) {
  console.log("Inside searchOwnerPropertyByName Get Request");

  kafka.make_request("searchOwnerDashboard_topic", req.params, function(
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
});

module.exports = router;
