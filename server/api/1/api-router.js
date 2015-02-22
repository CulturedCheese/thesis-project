var express = require('express');
var apiRouter = express.Router();
var databaseLogic = require('./databaseLogic.js');
var freelancersLogic = require('./freelancersLogic.js');
var passportElance = require('../../../server/elanceOauth.js');
var passportOdesk = require('../../../server/odeskOauth.js');

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

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
apiRouter.get('/auth/elance', passportElance.authenticate('elance'));
apiRouter.get('/auth/odesk', passportOdesk.authenticate('odesk'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
// apiRouter.get('/auth/elance/callback', 
//   passportElance.authenticate('elance', { successRedirect: '/about',
//                                       failureRedirect: '/contact' }));
apiRouter.get('/auth/odesk/callback', 
  passportOdesk.authenticate('odesk', { failureRedirect: '/' }),
  function(req, res){
    console.log('authenticated');
    res.redirect('/');
  });

apiRouter.get('/', function(req, res) {
  res.render('index');
});

module.exports = apiRouter;
