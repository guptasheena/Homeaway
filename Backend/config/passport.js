const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../models/user");
const dbkey = require("./keys");

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = dbkey.secretOrKey;

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ username: jwt_payload.username })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
