var express = require('express');
var apiRouter = express.Router();
var databaseLogic = require('./databaseLogic.js');
// var elanceLogic = require('/eLanceLogic.js');

apiRouter.get('/allCountriesAllLanguages', function(req,res) {
  databaseLogic.allCountriesAllLanguages(req,res);
});

apiRouter.get('/countriesForLanguage', function(req,res) {
  console.log('heard a request to countriesForLanguage');
  databaseLogic.countriesForLanguage(req,res);
});

// apiRouter.get('/eLanceData', function(req,res) {
//   console.log('heard a request to countriesForLanguage');
//   eLanceLogic.getAllData(req,res);
// });

module.exports = apiRouter;