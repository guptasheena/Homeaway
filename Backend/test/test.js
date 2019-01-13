var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("testing /search", function(done) {
  chai
    .request("http://localhost:3001")
    .post("/searchProperty/sheenagupta@homeaway.com")
    .send({
      location: "US",
      arrivedate: "2018-11-13T23:36:38.034Z",
      departdate: "2018-11-16T23:36:39.661Z",
      guests: "2"
    })
    .end(function(err, res) {
      console.log(res.text);
      expect(res).to.have.status(200);
      done();
    });
});
