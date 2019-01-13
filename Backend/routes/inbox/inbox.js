const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/sendQuestion", requireAuth, function(req, res) {
  console.log("Inside sendQuestion Post Request");

  kafka.make_request("sendQuestion_topic", req.body, function(err, result) {
    console.log(result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in sending message."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

router.post("/sendAnswer", requireAuth, function(req, res) {
  console.log("Inside sendAnswer Post Request");

  kafka.make_request("sendAnswer_topic", req.body, function(err, result) {
    console.log(result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in sending message."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

router.get("/getQuestion/:username", requireAuth, function(req, res) {
  console.log("Inside getQuestion Get Request");

  kafka.make_request("getQuestion_topic", req.params, function(err, result) {
    console.log("result=", result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in getting message."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

router.get("/getAnswer/:username", requireAuth, function(req, res) {
  console.log("Inside getAnswer Get Request");

  kafka.make_request("getAnswer_topic", req.params, function(err, result) {
    console.log(result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in getting message."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
