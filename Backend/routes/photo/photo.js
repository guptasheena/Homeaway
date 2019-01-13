const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var requireAuth = passport.authenticate("jwt", { session: false });
var express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("filename=" + file.originalname);

    const newFilename = `${file.originalname}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage }).any();

//to save the photos in "uploads" folder
router.post("/upload", requireAuth, function(req, res) {
  console.log("Inside upload Post Request");
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

//to download a photo by name
router.post("/download/:file(*)", requireAuth, (req, res) => {
  console.log("Downloading Photo");

  var fileNames = req.params.file.split(",");
  var base64imgArr = [];
  try {
    fileNames.map(fileName => {
      var fileLocation = path.join(__dirname + "../../../uploads", fileName);
      var img = fs.readFileSync(fileLocation);
      base64img = new Buffer(img).toString("base64");
      base64imgArr.push(base64img);
    });
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(JSON.stringify(base64imgArr));
  } catch (e) {
    res.end(JSON.stringify(e));
  }
});

module.exports = router;
