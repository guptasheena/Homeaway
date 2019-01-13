const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

//returns photos of all properties in traveler dashboard
router.get("/getAllPhotoNamesTraveler/:username", requireAuth, function(
  req,
  res
) {
  console.log("Inside getAllPhotoNamesTraveler Get Request");

  kafka.make_request("getTravelerPhotoNames_topic", req.params, function(
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

//returns photos of all properties in owner dashboard
router.get("/getAllPhotoNamesOwner/:username", requireAuth, function(req, res) {
  console.log("Inside getAllPhotoNamesOwner Get Request");

  kafka.make_request("getOwnerPhotoNames_topic", req.params, function(
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

//returns profile picture name of a user by username
router.get("/getUserPhotoName/:username", requireAuth, function(req, res) {
  console.log("Inside getUserPhotoName Get Request");

  kafka.make_request("getUserPhotoName_topic", req.params, function(
    err,
    result
  ) {
    console.log("result=", result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in fetching user profile"
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

//returns photo names of a property by its ID
router.get("/getPhotoNamesByPropertyID/:propertyID", requireAuth, function(
  req,
  res
) {
  console.log("Inside getPhotoNamesByPropertyID Get Request");

  kafka.make_request("getPropertyPhotoNames_topic", req.params, function(
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

//get photo names of search property results
router.post("/getAllPhotoNamesSearch/:username", requireAuth, function(
  req,
  res
) {
  console.log("Inside getAllPhotoNamesSearch Post Request");
  console.log(req.body);

  kafka.make_request(
    "getSearchPhotoNames_topic",
    { params: req.params, body: req.body },
    function(err, result) {
      console.log("result=", result);
      if (err) {
        res.json({
          status: "error",
          msg: "Could not fetch property details."
        });
      } else {
        res.send(JSON.stringify(result));
      }
    }
  );
});

module.exports = router;
