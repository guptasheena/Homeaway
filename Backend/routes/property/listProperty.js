var kafka = require("../../kafka/client");
const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var express = require("express");
const router = express.Router();

//to save a newly listed property in the database
router.post("/listproperty/:username", requireAuth, function(req, res) {
  console.log("Inside listproperty Post Request");
  console.log("Req Body : ", req.body);

  kafka.make_request(
    "listProperty_topic",
    { params: req.params, body: req.body },
    function(err, result) {
      console.log(result);
      if (err) {
        res.json({
          status: "error",
          msg: "Error in saving property details."
        });
      } else {
        res.status(200).send(JSON.stringify(result));
      }
    }
  );
});

module.exports = router;
