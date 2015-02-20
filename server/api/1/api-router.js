var express = require('express');
var apiRouter = express.Router();
var apiLogic = require('./apiLogic.js');

apiRouter.get('/allCountriesAllLanguages', function(req,res) {
  apiLogic.allCountriesAllLanguages(req,res);
});

apiRouter.get('/countriesForLanguage', function(req,res) {
  console.log('heard a request to countriesForLanguage');
  apiLogic.countriesForLanguage(req,res);
});

module.exports = apiRouter;