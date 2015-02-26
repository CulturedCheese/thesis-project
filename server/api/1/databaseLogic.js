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
    
    var sqlQuery2 = 'select * from yoyGrowth';

    db.query(sqlQuery2, function(err, response) {
      //this outer query gets the list of programmers for each country for each year
      var yoyGrowth = {};

      //gets all our country data into a pojo for easier processing later.
      for(var k = 0; k < response.length; k++) {
        var countryCode = response[k].countryCode;
        var programmer2013 = response[k].programmers2013;
        var programmer2014 = response[k].programmers2014;
        yoyGrowth[countryCode] = [programmer2013,programmer2014];
      }

      db.query(sqlQuery, function(err, response) {
        if(err) {
          console.error(err);
        } else {
          console.log('got data back from topLangsByCountry');
          console.log(response);
          //response is an array of objects. 
          //sample object: {"repository_language":"JavaScript","countryCode":"AM","totalActiveRepos":68}
          var countries1 = {};
          for(var i = 0; i < response.length; i++) {
            var item = response[i];
            var tuple = [item.repository_language, item.activeProgrammers];
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
                var countryName = lookupResults[0].name;
                
              }
              countries2[threeLetterName] = countries1[country];
              countries2[threeLetterName]['countryCode3'] = threeLetterName;
              countries2[threeLetterName]['countryCode2'] = country;
              countries2[threeLetterName]['countryName'] = countryName;
              if(yoyGrowth[country]) {
                countries2[threeLetterName]['2013'] = yoyGrowth[country][0];
                countries2[threeLetterName]['2014'] = yoyGrowth[country][1];
              } else {
                countries2[threeLetterName]['2013'] = 1;
                countries2[threeLetterName]['2014'] = 1;
              }
              
            }
          }
          res.send(countries2);
          
        }
      }); //this ends the inner db.query();
      
    })


  },

  countriesForLanguage: function(req,res) {
    //TODO: figure out what format our language variable is coming in as
    var languageVar = req._parsedUrl.query;
    var countriesQuery = 'SELECT activeProgrammers, countryCode FROM 14countries WHERE repository_language="' + languageVar + '" GROUP BY countryCode';
    // var countriesQuery2 = "select countryCode, activeProgrammers FROM 14countries WHERE repository_language='javascript' GROUP BY countryCode";
    db.query(countriesQuery, function(err, response) {
      if(err) {
        console.error(err);
      } else {

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
  },

  developerCountByCountry: function(req,res) {
    var sqlQuery = 'SELECT * FROM yoyGrowth';
    db.query(sqlQuery, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        res.send(response);
      }
    });
  },

  developerCountByLanguage: function(req,res) {
    var sqlQuery = 'SELECT * FROM languages';
    db.query(sqlQuery, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        res.send(response);
      }
    });
  }
};