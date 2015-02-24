var express = require('express');
var apiRouter = express.Router();
var oDeskApi = require('odesk-api'), rl = require('readline');

// configures oDesk api to enable HTTP requets
var config = require('./../../../config.js');
var config = {
  consumerKey : config.odeskAPI,
  consumerSecret : config.odeskSECRET,
  accessToken : config.odeskAccessToken,
  accessSecret : config.odeskAccessSecret,
  debug : false
};
var api = new oDeskApi(config);

// app controllers // TODO: rename to controller
var databaseLogic = require('./databaseLogic.js');
var freelancersLogic = require('./freelancersLogic.js');

// api routes for Github data
apiRouter.get('/allCountriesAllLanguages', function(req,res) {
  console.log('heard a request to allCountriesAllLanguages');
  databaseLogic.allCountriesAllLanguages(req,res);
});

apiRouter.get('/countriesForLanguage', function(req,res) {
  console.log('heard a request to countriesForLanguage');
  databaseLogic.countriesForLanguage(req,res);
});

// api routes for oDesk data
apiRouter.get('/odeskData', function(req,res) {
   console.log('heard a request to odeskData');
   freelancersLogic.getOdeskData(req,res);
});


apiRouter.get('/roles', function(req, res) {
  var Search = require('odesk-api/lib/routers/freelancers/search.js').Search;
  var freelancers = new Search(api);
  api.setAccessToken(config.accessToken, config.accessSecret, function() {
    var params = {'q': 'JavaScript', 'title': 'Software Developer'};
    freelancers.find(params, function(error, data) {
      res.send(data);

    })
  });
});

module.exports = apiRouter;
