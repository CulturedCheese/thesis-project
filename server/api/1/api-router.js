var express = require('express');
var apiRouter = express.Router();
var databaseLogic = require('./databaseLogic.js');
var freelancersLogic = require('./freelancersLogic.js');
var passportElance = require('../../../server/elanceOauth.js');
var passportOdesk = require('../../../server/odeskOauth.js');
var Roles = require('odesk-api/lib/routers/hr/roles.js').Roles;
var oDeskApi = require('odesk-api'), rl = require('readline');
var creds = require('../../../config.js');
var api = new oDeskApi({ consumerKey: creds.odeskAPI,
    consumerSecret: creds.odeskSECRET });


apiRouter.get('/allCountriesAllLanguages', function(req,res) {
	console.log('heard a request to allCountriesAllLanguages');
  databaseLogic.allCountriesAllLanguages(req,res);
});

apiRouter.get('/countriesForLanguage', function(req,res) {
  console.log('heard a request to countriesForLanguage');
  databaseLogic.countriesForLanguage(req,res);
});

apiRouter.get('/eLanceData', function(req,res) {
   console.log('heard a request to eLanceData');
   freelancersLogic.getElanceData(req,res);
});

apiRouter.get('/odeskData', function(req,res) {
   console.log('heard a request to eLanceData');
   freelancersLogic.getOdeskData(req,res);
});

apiRouter.get('/', function(req, res) {
  console.log(req.user);
  res.render('about.html');
});
// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
// apiRouter.get('/auth/elance', passportElance.authenticate('elance'));
apiRouter.get('/auth/odesk', passportOdesk.authenticate('odesk'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
// apiRouter.get('/auth/elance/callback', 
//   passportElance.authenticate('elance', { successRedirect: '/about',
//                                       failureRedirect: '/contact' }));
apiRouter.get('/auth/odesk/callback', 
  passportOdesk.authenticate('odesk', {failureRedirect: 'http://www.google.com'}),
  function(req, res){
    console.log('authenticated');
    res.redirect('http://www.yahoo.com');
  });

apiRouter.get('/roles', function(req, res) {
   var roles = new Roles(api);
   roles.getAll(function(error, data){
     console.log(data);
   })
});

module.exports = apiRouter;
