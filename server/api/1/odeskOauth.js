var Auth = require('odesk-api/lib/routers/auth').Auth;
var oDeskApi = require('odesk-api');
var rl = require('readline');

// configures the authorization request
var config = require('./../../../config.js');
var config = {
  consumerKey : config.odeskAPI,
  consumerSecret : config.odeskSECRET,
  accessToken : config.odeskAccessToken,
  accessSecret : config.odeskAccessSecret,
  debug : false
};

// a function to get access token/secret pair
function getAccessTokenSecretPair(api, callback) {
  // get authorization url
  api.getAuthorizationUrl('http://localhost:3000/api/1/callback', function(error, url, requestToken, requestTokenSecret) {
    if (error) throw new Error('can not get authorization url, error: ' + error);
    debug(requestToken, 'got a request token');
    debug(requestTokenSecret, 'got a request token secret');

    // authorize application
    var i = rl.createInterface(process.stdin, process.stdout);
    i.question('Please, visit an url ' + url + ' and enter a verifier: ', function(verifier) {
      i.close();
      process.stdin.destroy();
      debug(verifier, 'entered verifier is');

      // get access token/secret pair
      api.getAccessToken(requestToken, requestTokenSecret, verifier, function(error, accessToken, accessTokenSecret) {
        if (error) throw new Error(error);

        debug(accessToken, 'got an access token');
        debug(accessTokenSecret, 'got an access token secret');

        callback(accessToken, accessTokenSecret);
      });
    });
  });
};

// get my data
function getUserData(api, callback) {
  // make a call
  var auth = new Auth(api);
  auth.getUserInfo(function(error, data) {
    // check error if needed and run your own error handler
    callback(error, data);
  });
}

(function main() {

  // use a predefined client for OAuth routine
  var api = new oDeskApi(config);

  if (!config.accessToken || !config.accessSecret) {
    // run authorization in case we haven't done it yet
    // and do not have an access token-secret pair
    getAccessTokenSecretPair(api, function(accessToken, accessTokenSecret) {
      debug(accessToken, 'current token is');
      // store access token data in safe place!

      // get my auth data
      getUserData(api, function(error, data) {
        debug(data, 'response');
        console.log('Hello:' + data.auth_user.first_name);
      });
    });
  } else {
    // setup access token/secret pair in case it is already known
    api.setAccessToken(config.accessToken, config.accessSecret, function() {
      // get my auth data
      getUserData(api, function(error, data) {
        debug(data, 'response');
        // server_time
        console.log(data)
        console.log('Hello: ' + data.auth_user.first_name);
      });
    });
  }
})();
