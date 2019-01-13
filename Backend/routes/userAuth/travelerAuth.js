var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

//to authenticate traveler and allows to log-in as a traveller
router.post("/travelerlogin", (req, res) => {
  kafka.make_request("travelerLogin_topic", req.body, function(err, result) {
    console.log(result);

    if (err) {
      res.json({
        status: "error",
        msg: "Username and/or Password is incorrect."
      });
    } else {
      console.log("result=", result);

      res.status(200).send(JSON.stringify(result));
    }
  });
});

//to sign-up a new traveler
router.post("/travelersignup", function(req, res) {
  console.log("Inside travelersignup Post Request");
  console.log("Req Body : ", req.body);

  kafka.make_request("travelerSignup_topic", req.body, function(err, result) {
    console.log("result=", result);

    if (err) {
      res.json({
        status: "error",
        msg: "Error in traveler sign-up."
      });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
