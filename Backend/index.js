var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
require("./database/mongoose");

var userProfileRoute = require("./routes/userProfile/userProfile");
var travelerAuth = require("./routes/userAuth/travelerAuth");
var ownerAuth = require("./routes/userAuth/ownerAuth");
var photo = require("./routes/photo/photo");
var photoNames = require("./routes/photo/photoNames");
var listProperty = require("./routes/property/listProperty");
var searchProperty = require("./routes/property/searchProperty");
var bookProperty = require("./routes/property/bookProperty");
var ownerDashboards = require("./routes/dashboards/ownerDashboards");
var travelerDashboard = require("./routes/dashboards/travelerDashboard");
var inbox = require("./routes/inbox/inbox");
app.use(userProfileRoute);
app.use(travelerAuth);
app.use(ownerAuth);
app.use(photo);
app.use(photoNames);
app.use(listProperty);
app.use(searchProperty);
app.use(bookProperty);
app.use(ownerDashboards);
app.use(travelerDashboard);
app.use(inbox);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.listen(3001, function() {
  console.log("Server Listening on port 3001");
});
