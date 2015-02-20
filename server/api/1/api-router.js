var express = require('express');
var apiRouter = express.Router();
var databaseLogic = require('./databaseLogic.js');
var freelancersLogic = require('./freelancersLogic.js');
var passportOdesk = require('../../../server/odeskOauth.js');
var oDeskApi = require('odesk-api'), rl = require('readline');
var config = {
  'consumerKey': 'a9afa7abab1747913f87e577bb45f11f',
  'consumerSecret': 'f1599d87331c5fcc',
  accessToken: '375d1f453e965b258495afecc4a5194d',
  accessSecret: 'e2275cea1490a887'
};
var api = new oDeskApi(config);
var Roles = require('odesk-api/lib/routers/hr/roles.js').Roles;
var roles = new Roles(api);
var creds = require('../../../config.js');
// var api = new oDeskApi({ consumerKey: creds.odeskAPI,
//     consumerSecret: creds.odeskSECRET });
var Search = require('odesk-api/lib/routers/freelancers/search.js').Search;
var freelancers = new Search(api);
var Auth = require('odesk-api/lib/routers/auth').Auth;
var auth = new Auth(api);
var Jobs = require('odesk-api/lib/routers/hr/jobs.js').Jobs;
var jobs = new Jobs(api);


apiRouter.get('/allCountriesAllLanguages', function(req,res) {
	console.log('heard a request to allCountriesAllLanguages');
  databaseLogic.allCountriesAllLanguages(req,res);
});

apiRouter.get('/countriesForLanguage', function(req,res) {
  console.log('heard a request to countriesForLanguage');
  databaseLogic.countriesForLanguage(req,res);
});

apiRouter.get('/odeskData', function(req,res) {
   console.log('heard a request to odeskData');
   freelancersLogic.getOdeskData(req,res);
});

apiRouter.get('/', function(req, res) {
  console.log(req.user);
  res.render('about.html');
});
// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
// apiRouter.get('/auth/odesk', passportOdesk.authenticate('odesk'));

// // The OAuth 2.0 provider has redirected the user back to the application.
// // Finish the authentication process by attempting to obtain an access
// // token.  If authorization was granted, the user will be logged in.
// // Otherwise, authentication has failed.

// apiRouter.get('/auth/odesk/callback', 
//   passportOdesk.authenticate('odesk', {failureRedirect: 'http://www.google.com'}),
//   function(req, res){
//     console.log('authenticated');
//     res.redirect('http://www.yahoo.com');
//   });

apiRouter.get('/roles', function(req, res) {
  api.setAccessToken(config.accessToken, config.accessSecret, function() {
    var params = {'q': 'JavaScript', 'title': 'Software Developer'};
    freelancers.find(params, function(error, data) {
      console.log(data);
    })
  });
});

module.exports = apiRouter;
