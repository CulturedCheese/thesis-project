var express = require('express');
var apiRouter = express.Router();
var oDeskApi = require('odesk-api'), rl = require('readline');
var Q = require('q'); 
var url = require('url');

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

apiRouter.get('/developerCountByCountry', function(req,res) {
  console.log('heard a request to developerCountByCountry');
  databaseLogic.developerCountByCountry(req,res);
});

apiRouter.get('/developerCountByLanguage', function(req,res) {
  console.log('heard a request to developerCountByLanguage');
  databaseLogic.developerCountByLanguage(req,res);
});

// api route for oDesk data
// routes to the odesk API-based profile listing given country and language
apiRouter.get('/odeskByCountry', function(req, res) {

  api.setAccessToken(config.accessToken, config.accessSecret, function() {
    var Search = require('odesk-api/lib/routers/freelancers/search.js').Search;
    var freelancers = new Search(api);
    var language = req.language || 'JavaScript'; //TODO: need to make dynamic, i.e., req.language, based on user input on front-end
    var country = req.country || 'Vietnam'; //TODO: need to make dynamic, i.e., req.country,  based on user input on front-end
    var page = req.page || 0;
    // queries the top 20 results; at least 4.0 feedback score
    var params = {'q': 'skills:'+ language + ' AND country:' + country, 'paging': page + ';20', 'feedback': '[4 TO 5]'}
    var profiles = Q.nbind(freelancers.find,freelancers);
    
    profiles(params)
      .then(function (results) {
        var profiles = results.providers; // an array containing a list of 20 freelancer profiles
        // parse profiles to grab only the name, title, skills, feedback, portrait, id from each profile  
        var summaryProfiles = profiles.map(function(profile){
          return {
            name: profile.name,
            title: profile.title,
            skills: profile.skills,
            feedback: profile.feedback,
            portrait: profile.portrait_50,
            country: profile.country,
            hourlyRate: profile.rate,
            url: 'https://www.odesk.com/o/profiles/users/_' + profile.id
          };
        });
        res.send(summaryProfiles);
      })
  });
});

module.exports = apiRouter;
