// Using passport (http://http://passportjs.org/guide/oauth/) to authenticate users with Oauth.

var passportOdesk = require('passport'), OdeskStrategy = require('passport-odesk').Strategy; 

var creds = require('../config.js');

passportOdesk.serializeUser(function(user, done) {
  done(null, user);
});

passportOdesk.deserializeUser(function(obj, done) {
  done(null, obj);
});
//move clientID and secret as to not expose credentials
passportOdesk.use(new OdeskStrategy({
    consumerKey: creds.odeskAPI,
    consumerSecret: creds.odeskSECRET,
    callbackURL: creds.odeskCallbackURL
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      console.log(profile);
      // To keep the example simple, the user's odesk profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the odesk account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = passportOdesk;