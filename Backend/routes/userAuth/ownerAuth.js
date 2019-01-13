var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

//to authenticate owner and allows to log-in as an owner
router.post("/ownerlogin", function(req, res) {
  console.log("Inside ownerlogin Post Request");
  console.log("Req Body : ", req.body);

  kafka.make_request("ownerLogin_topic", req.body, function(err, result) {
    console.log(result);
    if (err) {
      res.json({
        status: "error",
        msg: "Username and/or Password is incorrect."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

//checks if users credentials are valid. If yes, then marks the traveler as owner in the database
router.post("/ownersignup/:current_user", function(req, res) {
  console.log("Inside ownersignup Post Request");
  console.log("Req Body : ", req.body);

  kafka.make_request(
    "ownerSignup_topic",
    { body: req.body, params: req.params },
    function(err, result) {
      console.log(result);
      if (err) {
        res.json({
          status: "error",
          msg: "Username and/or Password is incorrect."
        });
      } else {
        res.send(JSON.stringify(result));
      }
    }
  );
});

//to check is a particular user is an owner
router.get("/checkIsOwner/:username", function(req, res) {
  console.log("Inside checkIsOwner Get Request");

  kafka.make_request("checkIsOwner_topic", req.params, function(err, result) {
    console.log(result);
    if (err) {
      res.json({
        status: "error",
        msg: "No Owner found"
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
