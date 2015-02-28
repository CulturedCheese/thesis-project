var db = require('../../db');
var githubToMysqlMap =  require('../../config/utils.js').githubToMysqlMap; //mapping from github language names to the names we've stored as mysql column headers without spaces or special characters.
var mysqlToGithubMap = require('../../config/utils.js').mysqlToGithubMap;
var http = require('http');
var lookup = require('country-data').lookup;

module.exports = {
  allCountriesAllLanguages: function(req, res) {
    console.log('heard a request to allCountriesAllLanguages');
    //theoretically selects the top 10 languages by country, but for some reason, isn't working.
    //oddly, this works perfectly well in MySQL directly, it just doesn't work so well when using db.query. 
    //TODO: rearrange this so that we have a table prepopulated with only the top 10 for each country, and then just serve up all results from that table within this api call. 
    // var sqlQuery =  'SELECT repository_language, countryCode, activeProgrammers FROM ( SELECT repository_language, countryCode, activeProgrammers,   @country_rank := IF(@current_country = countryCode, @country_rank + 1, 1) AS country_rank, @current_country := countryCode FROM 14countries     ORDER BY countryCode, activeProgrammers DESC ) ranked WHERE country_rank <= 10';

    var sqlQuery3 = 'SELECT repository_language, countryCode, SUM(activeProgrammers) AS activeProgrammers FROM 14countries GROUP BY countryCode, repository_language ORDER BY countryCode, activeProgrammers DESC';
    
    var sqlQuery2 = 'select * from yoyGrowth JOIN salaryByCountry ON yoyGrowth.countryCode = salaryByCountry.countryCodeTwoLetter';
    //first we do an outer query to get the yoyGrowth data
    //we could do a merge of this into the inner query, but that would create a lot of denormalized data
    //this way we can just add this data in once for each country, rather than for each language for each country. 
    db.query(sqlQuery2, function(err, response) {
      if(err) {
        console.error(err);
      } else {

        //this outer query gets the list of programmers for each country for each year
        var yoyGrowth = {};

        //gets all our country data into a pojo for easier processing later.
        for(var k = 0; k < response.length; k++) {
          var countryCode = response[k].countryCode;
          var programmer2013 = response[k].programmers2013;
          var programmer2014 = response[k].programmers2014;
          //we are multiplying the WorldBank hourly wage figures by two intentionally:
            //the data are all old (at least half a decade, up to nearly three decades in some cases)
            //the data seem to reflect take home wages for the worker, rather than cost to the employer
            //there is a premium for hiring contract workers on an hourly basis
          var hourlyWage = response[k].hourlyWage *2;
          yoyGrowth[countryCode] = [programmer2013,programmer2014, hourlyWage];
        }

        //this query grabs the top languages for each country
        db.query(sqlQuery3, function(err, response) {
          if(err) {
            console.error(err);
          } else {
            //countries1 is built off the two letter country codes (which is what the geonames API returned)
            var countries1 = {};
            for(var i = 0; i < response.length; i++) {
              var item = response[i];
              var tuple = [item.repository_language, item.activeProgrammers];
              //if the country doesn't exist yet, add it!
              if(!countries1[item.countryCode]) {
                countries1[item.countryCode] = {
                  fillKey: item.repository_language,
                  allLangs: [tuple]
                };
              } else {
                countries1[item.countryCode].allLangs.push(tuple);
              }
            }
            //countries2 will be built using the three letter countryCodes that the d3 map requires
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
                  countries2[threeLetterName]['hourlyWage'] = yoyGrowth[country][2];

                } else {
                  countries2[threeLetterName]['2013'] = 1;
                  countries2[threeLetterName]['2014'] = 1;
                }
                
              }
            }
            res.send(countries2);
            
          }
        
      }); //this ends the inner db.query();
      
      }
    })


  },

  countriesForLanguage: function(req,res) {
    //TODO: figure out what format our language variable is coming in as
    var languageVar = req._parsedUrl.query;
    var countriesQuery = 'SELECT activeProgrammers, countryCode, hourlyWage FROM 14countries JOIN salaryByCountry ON 14countries.countryCode = salaryByCountry.countryCodeTwoLetter WHERE repository_language="' + languageVar + '" GROUP BY countryCode ORDER BY activeProgrammers DESC';
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
              countries[threeLetterName] = {
                fillKey: response[i].activeProgrammers,
                countryCode2: lookupResults[0].alpha2,
                countryCode3: threeLetterName,
                countryName: lookupResults[0].name
              };
            }
          }
        }
        res.send(countries);
      }
    });
  },

  developerCountByCountry: function(req,res) {
    var sqlQuery = 'SELECT countryCode, programmers2014, programmers2013, hourlyWage FROM yoyGrowth JOIN salaryByCountry ON yoyGrowth.countryCode = salaryByCountry.countryCodeTwoLetter';
    db.query(sqlQuery, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        var countries = {};
        for(var i = 0; i < response.length; i++) {
          var lookupResults = lookup.countries({alpha2: response[i].countryCode});
          //not all countries play nicely, or we might have null in our dataset. 
          if(lookupResults[0]) {
            var countryCode3 = lookupResults[0].alpha3;
            var countryCode2 = lookupResults[0].alpha2;
            var countryName = lookupResults[0].name;

            countries[countryCode3] = {
              programmers2013: response[i].programmers2013,
              programmers2014: response[i].programmers2014,
              hourlyWage: response[i].hourlyWage,
              countryCode2: countryCode2,
              countryCode3: countryCode3,
              countryName: lookupResults[0].name
            }
            
          }
        }
        res.send(countries);
      }
    });
  },

  developerCountByLanguage: function(req,res) {
    var sqlQuery = 'SELECT * FROM languages ORDER BY activeProgrammers DESC';
    db.query(sqlQuery, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        res.send(response);
      }
    });
  }
};