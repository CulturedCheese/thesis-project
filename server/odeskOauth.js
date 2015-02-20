// Using passport (http://http://passportjs.org/guide/oauth/) to authenticate users with Oauth.

var passportOdesk = require('passport'), OdeskStrategy = require('passport-odesk').Strategy; 

var creds = require('../config.js');

//move clientID and secret as to not expose credentials
passportOdesk.use(new OdeskStrategy({
    consumerKey: creds.odeskAPI,
    consumerSecret: creds.odeskSECRET,
    callbackURL: creds.odeskCallbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ id: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passportOdesk;