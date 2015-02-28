var db = require('../db');
var githubToMysqlMap =  require('../config/utils.js').githubToMysqlMap; //mapping from github language names to the names we've stored as mysql column headers without spaces or special characters.
var mysqlToGithubMap = require('../config/utils.js').mysqlToGithubMap;
var http = require('http');
var lookup = require('country-data').lookup;
var path = require('path');
var fs = require('fs');

//map of dangerous characters to a hex representation
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
  '/': '&#x2F;',
  '\n': '<br>'
};

// escaping html for XSS attacks
var escapeHtml = function (string) {
  return String(string).replace(/[&<>"'\/]|[\n]/g, function (s) {
    return entityMap[s];
  });
}

module.exports = {
  escapeAndLoadUsersByLang: function(req, res) {
    //NOTE: this is not fully functional yet. it ended up not being a focus for MVP. 
    console.log('directory is:',__dirname);
    var filePath = path.join(__dirname, '../../db2/201311_all_data_grouped_to_user_by_lang.csv');
    console.log('filePath:');
    console.log(filePath);
    fs.readFile(filePath,'utf8', function(err, data) {
      if(err) {
        console.log('error from reading file inside escapeAndLoadUsersByLang');
        console.error(err);
      } else {
        var bufferString = data.toString(); 
        var bufferStringSplit = bufferString.split('\n'); 
        // console.log(bufferStringSplit);
        var i = 0;
        //using setInterval to iterate through the csv file without overloading our db
        var interval = setInterval(function() {
          var line = bufferStringSplit[i];
          if(i%1000 === 0) {
            console.log('Processed row ',i,':',line);
          }
          //the problem is that the users have commas in their place names. 
          //we could probably use a regular expression to split each line, escape it, and then insert it to the DB.
          var insertQuery = '';
          db.query(insertQuery);
          if(++i >=bufferStringSplit.length) {
            console.log('reached the end of the file!');
            clearInterval(interval);
          }

        }, 5);
        res.send(bufferStringSplit);
      }
    });
  },

  convertLatLongToCountry: function(req,res) {
    //This works and we ARE using it! 
    //this grabs data from our db to get the lat/long
      //then queries the geonames api for the two-letter country Code surrounding that lat/long
      //then updates the db as appropriate
      //ER is an error code, not Eritrea
    var dbErrorObj = {};
    var geoNamesErrorObj = {};
    var successfulRows = {};
    console.log('heard a request to convertLatLongToCountry!');
    var i = 51696;

    //we are intentionally throttling our requests to the geonames server
    //they limit us to 2000 per hour, and this keeps us under that cap
    var interval = setInterval(function() {
      i++;

      var rowNum = i;
      var sqlQuery = 'SELECT * FROM placesWithGeo WHERE ID= ' + rowNum;

      if(i >= 67121) {
        clearInterval(interval);
        console.log('GOT TO THE END OF 17755!!!!!!');
      } else {

        db.query(sqlQuery, function(err, results) {
          if(err) {
            dbErrorObj[rowNum] = 'dbError';
            console.error(err);
          } else {
            var lat = results[0].latitude;
            var long = results[0].longitude;
            var urlString = 'http://ws.geonames.org/countryCode?lat=' + lat + '&lng=' + long + '&username=climbsrocks';
            //the username 'tinytim' works as well

            http.get(urlString, function(response) {
              // Continuously update stream with data
              var body = '';
              response.on('data', function(d) {
                body += d;
              });
              response.on('end', function() {
                // Data reception is done, do whatever with it!
                body = body.slice(0,2);
                console.log('sliced data from geonames', body);
                var sqlString = 'SELECT * FROM places ORDER BY user_location_count DESC LIMIT 2';
                var updateString = 'UPDATE placesWithGeo SET countryCode= "' + body + '" WHERE ID=' + rowNum;
                db.query(updateString);
              });
            });
          }
      });//db.query ends here
      }
    }, 2000);
  },

  convertLatLongToCountryCleaning: function(req,res) {
    //This works and we ARE using it. 
    //this grabs all the error codes and NULL s and finds their countryCodes
    console.log('heard a request to convertLatLongToCountryCleaning!');
    var rowNum = 49407; //this is the ID of the first row in our DB.

    var interval = setInterval(function() {
      rowNum++;
      //making sure rowID is still what we expect it to be when dealing with asynch functions.
      var rowID = rowNum;

      //select only rows that have a countryCode of 'ER' (error) or null
      var sqlQuery = 'SELECT * FROM placesWithGeo WHERE (countryCode="ER" OR countryCode IS NULL) AND ID>=' + rowID + ' ORDER BY ID ASC LIMIT 1';

      if(rowID >= 84916) {//the ID of the last row in our db is 84916
        clearInterval(interval);
        console.log('GOT TO THE END OF the db!');
      } else {

        db.query(sqlQuery, function(err, results) {
          if(err) {
            console.error(err);
          } else {
            var lat = results[0].latitude;
            var long = results[0].longitude;
            rowNum = results[0].ID;
            rowID = results[0].ID;
            //I expected the Google Maps API to be more reliable, but it turns out that GeoNames is pretty good, and allows the radius parameter.
            //The radius parameter says "find the nearest country within this radius in km", which works really well for countries like NZ where the lat long is actually in the water in between the islands. 
            // var googleMapsURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +lat + ',' + long + '&result_type=country&key=AIzaSyC2XH3yPRy-DfzFgkcl1JaVsFeC-qm0T0E';
            var geonamesURL = 'http://ws.geonames.org/countryCode?lat=' + lat + '&lng=' + long + '&radius=10&username=climbsrocks';

            //get the countryCode from geonames
            http.get(geonamesURL, function(response) {
              // Continuously update stream with data
              var body = '';
              response.on('data', function(d) {
                body += d;
              });
              response.on('end', function() {
                // Data reception is done, do whatever with it!
                //take only the first two letters from the body- this is the two letter country code
                //anything longer than this is likely an error code. 

                body = body.slice(0,2);
                console.log(results[0].user_location + ' results in:', body);
                var updateString = 'UPDATE placesWithGeo SET countryCode= "' + body + '" WHERE ID=' + rowID;
                db.query(updateString);
              });

            }).on('error', function(e) {
              console.error(e);
              console.log('got an error. message:', e.message);
            });
              
          }
      });//db.query ends here
      }
    }, 2000);
  },

  topDevsByCountry: function(req,res) {
    console.log('heard a request to topDevsByCountry');
    var sqlQuery = 'SELECT * FROM 14users';
    db.query(sqlQuery, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        var results = {};
        for(var i = 0; i < response.length; i++) {
          var item = response[i];
          var country = item.countryCode;
          var language = item.repository_language;
          //if the country doesn't exist, initialize it
          if(!results[country]) {
            results[country] = {};
          }
          //if the language doesn't exist for that country, initialize it
          if(!results[country][language]) {
            results[country][language] = [];
          }
          //now the country and language exist
          //check to see if we can skip out on this easily because we already have 10 items and the new item is less than the 10th largest item. if 
          if(!(results[country][language].length === 10 && item.activeReposByLang < results[country][language][9].activeRepos)) {
            //create the item to be added
            var pushItem = {
              username: item.actor_attributes_login,
              activeRepos: item.activeReposByLang
            };
            //add the item
            results[country][language].push(pushItem);
            //sort the resulting array
            results[country][language].sort(function(a,b) {
              return b.activeRepos - a.activeRepos;
            });
            //if we have too many items, get rid of one.
            if(results[country][language].length > 10) {
              results[country][language].pop();
            }
          }
        }
        var insertionCount = 0;
        var queryCount = 0;
        for (var country in results) {
          // console.log(country);
          for (var language in results[country]) {
            // console.log(results[country][language]);
            // console.log(JSON.stringify(results[country][language]));
            //insert results into db!
            var sqlInsert = "INSERT INTO topUsersByLang (countryCode, language, users) VALUES('"
              + country + "','"
              + language + "','"
              + JSON.stringify(results[country][language]) + "')";

            db.query(sqlInsert, function(err, response) {
              if(err) {
                console.error(err);
              } else {
                if(++insertionCount % 1000 === 0) {
                  console.log('inserted ' + insertionCount + ' into db!');
                }
              }
            });
          }
        }
        //the users are now all aggregated.
        //TODO: next steps:
        //1. insert into DB
        //2. figure out how to get github avatar pic
        res.send(results);
      }
    })
  }

};
