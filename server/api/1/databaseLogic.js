var db = require('../../db');
var githubToMysqlMap =  require('../../config/utils.js').githubToMysqlMap; //mapping from github language names to the names we've stored as mysql column headers without spaces or special characters.
var mysqlToGithubMap = require('../../config/utils.js').mysqlToGithubMap;
var http = require('http');
var lookup = require('country-data').lookup;

module.exports = {
  allCountriesAllLanguages: function(req, res) {
    console.log('heard a request to allCountriesAllLanguages');
    //selects the top 10 languages by country;
    var sqlQuery =  'SELECT repository_language, countryCode, activeProgrammers       FROM ( SELECT repository_language, countryCode, activeProgrammers,   @country_rank := IF(@current_country = countryCode, @country_rank + 1, 1) AS country_rank, @current_country := countryCode     FROM 14countries     ORDER BY countryCode, activeProgrammers DESC   ) ranked      WHERE country_rank <= 10';
    // var sqlQuery2 = 'select * from countriesAggAll limit 100';
    db.query(sqlQuery, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        console.log('got data back from topLangsByCountry');
        //response is an array of objects. 
        //sample object: {"repository_language":"JavaScript","countryCode":"AM","totalActiveRepos":68}
        var countries1 = {};
        for(var i = 0; i < response.length; i++) {
          var item = response[i];
          var tuple = [item.repository_language, item.totalActiveRepos];
          if(!countries1[item.countryCode]) {
            countries1[item.countryCode] = {
              fillKey: item.repository_language,
              allLangs: [tuple]
            };
          } else {
            countries1[item.countryCode].allLangs.push(tuple);
          }
        }
        var countries2 = {};
        for(var country in countries1) {
          if(country !== 'null') {
            var lookupResults = lookup.countries({alpha2: country});
            if(lookupResults[0]) {
              var threeLetterName = lookupResults[0].alpha3;
              
            }
            countries2[threeLetterName] = countries1[country];
            
          }
        }
        res.send(countries2);
        
      }

    }); //this ends the db.query();

  },

  countriesForLanguage: function(req,res) {
    //TODO: figure out what format our language variable is coming in as
    var languageVar = req.body.language || 'Javascript';
    var countriesQuery = 'SELECT activeProgrammers, countryCode FROM 14countries WHERE repository_language="' + languageVar + '" GROUP BY countryCode';
    var countriesQuery2 = "select countryCode, activeProgrammers FROM 14countries WHERE repository_language='javascript' GROUP BY countryCode";
    db.query(countriesQuery2, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        console.log('response!');
        console.log(response);

        //all this logic is to get the three letter country code, and to format our response object to use the fillKey format
        var countries = {};
        for(var i = 0; i < response.length; i++) {
          var country = response[i].countryCode;
          if(country !== 'null') {
            var lookupResults = lookup.countries({alpha2: country});
            if(lookupResults[0]) {
              var threeLetterName = lookupResults[0].alpha3;
              countries[threeLetterName] = {fillKey: response[i].activeProgrammers};
            }
          }
        }
        res.send(countries);
      }
    });
  }
};