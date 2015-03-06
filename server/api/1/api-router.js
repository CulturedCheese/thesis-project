var express = require('express');
var apiRouter = express.Router();
var databaseLogic = require('./databaseLogic.js');
var oDeskLogic = require('./odeskLogic.js');

// api routes for Github data
apiRouter.get('/allCountriesAllLanguages', function(req,res) {
  console.log('heard a request to allCountriesAllLanguages');
  databaseLogic.allCountriesAllLanguages(req,res);
});

apiRouter.get('/countriesForLanguage', function(req,res) {
  console.log('heard a request to countriesForLanguage');
  databaseLogic.countriesForLanguage(req,res);
});

apiRouter.get('/developerCountByCountry', function(req,res) {
  console.log('heard a request to developerCountByCountry');
  databaseLogic.developerCountByCountry(req,res);
});

apiRouter.get('/developerCountByLanguage', function(req,res) {
  console.log('heard a request to developerCountByLanguage');
  databaseLogic.developerCountByLanguage(req,res);
});

// api route for oDesk data
apiRouter.get('/coders', function(req, res) {
  console.log('heard a request to coders');
  oDeskLogic.getCoders(req,res);
});

module.exports = apiRouter;
