var connection = new require("./kafka/Connection");
//User
var travelerSignup = require("./services/User/travelerSignup.js");
var travelerLogin = require("./services/User/travelerLogin.js");
var ownerSignup = require("./services/User/ownerSignup.js");
var ownerLogin = require("./services/User/ownerLogin.js");
var isOwner = require("./services/User/isOwner.js");
//Dashboards
var getOwnerDashboard = require("./services/Dashboards/OwnerDashboard/getDashboard");
var searchOwnerDashboard = require("./services/Dashboards/OwnerDashboard/searchDashboard");
var getTravelerDashboard = require("./services/Dashboards/TravelerDashboard/getDashboard");
var searchTravelerDashboard = require("./services/Dashboards/TravelerDashboard/searchDashboard");
//Photo
var getOwnerPhotoNames = require("./services/Photo/getOwnerPhotoNames");
var getTravelerPhotoNames = require("./services/Photo/getTravelerPhotoNames");
var getUserPhotoName = require("./services/Photo/getUserPhotoName");
var getPropertyPhotoNames = require("./services/Photo/getPropertyPhotoNames");
var getSearchPhotoNames = require("./services/Photo/getSearchPhotoNames");
//Property
var bookProperty = require("./services/Property/bookProperty");
var listProperty = require("./services/Property/listProperty");
var searchProperty = require("./services/Property/searchProperty");
var searchPropertyByID = require("./services/Property/searchPropertyByID");
//UserProfile
var getProfile = require("./services/UserProfile/getProfile");
var saveProfile = require("./services/UserProfile/saveProfile");
//Inbox
var sendQuestion = require("./services/Inbox/sendQuestion");
var sendAnswer = require("./services/Inbox/sendAnswer");
var getQuestion = require("./services/Inbox/getQuestion");
var getAnswer = require("./services/Inbox/getAnswer");

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];

      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}

//User
handleTopicRequest("travelerSignup_topic", travelerSignup);
handleTopicRequest("travelerLogin_topic", travelerLogin);
handleTopicRequest("ownerSignup_topic", ownerSignup);
handleTopicRequest("ownerLogin_topic", ownerLogin);
handleTopicRequest("checkIsOwner_topic", isOwner);
//Dashboards
handleTopicRequest("getOwnerDashboard_topic", getOwnerDashboard);
handleTopicRequest("searchOwnerDashboard_topic", searchOwnerDashboard);
handleTopicRequest("getTravelerDashboard_topic", getTravelerDashboard);
handleTopicRequest("searchTravelerDashboard_topic", searchTravelerDashboard);
//Photo
handleTopicRequest("getOwnerPhotoNames_topic", getOwnerPhotoNames);
handleTopicRequest("getTravelerPhotoNames_topic", getTravelerPhotoNames);
handleTopicRequest("getUserPhotoName_topic", getUserPhotoName);
handleTopicRequest("getPropertyPhotoNames_topic", getPropertyPhotoNames);
handleTopicRequest("getSearchPhotoNames_topic", getSearchPhotoNames);
//Property
handleTopicRequest("bookProperty_topic", bookProperty);
handleTopicRequest("listProperty_topic", listProperty);
handleTopicRequest("searchProperty_topic", searchProperty);
handleTopicRequest("searchPropertyByID_topic", searchPropertyByID);
//UserProfile
handleTopicRequest("getProfile_topic", getProfile);
handleTopicRequest("saveProfile_topic", saveProfile);
//Inbox
handleTopicRequest("sendAnswer_topic", sendAnswer);
handleTopicRequest("sendQuestion_topic", sendQuestion);
handleTopicRequest("getQuestion_topic", getQuestion);
handleTopicRequest("getAnswer_topic", getAnswer);
