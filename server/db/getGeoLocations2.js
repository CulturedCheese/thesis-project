var db = require('../db');
var http = require('http');

module.exports = {
  get: function (req, res) {
    var sqlString = 'SELECT * FROM places ORDER BY user_location_count DESC LIMIT 2'; //gets the top 100 locations;
    // var sqlString = 'SELECT COUNT(user_location) FROM places WHERE user_location_count > 1000'; //gets the total count of places over a certain threshold
    db.query(sqlString, function(err, results) {
      console.log('queried the db!');
      console.log('db results', results);
      //the results are an array of objects, with keys for user_location and user_location_count
      for(var i = 0; i < results.length; i++) {
        var createUrlString = function(place) {
          return 'http://unlock.edina.ac.uk/ws/closestMatchSearch?name=' + place + '&gazetteer=geonames&format=json';
        }
        var urlString = createUrlString(results[i].user_location);
        console.log('urlString', urlString);
        if(results[i].user_location) {
          //turn this into an http request, rather than an ajax request. 
          http.get(urlString, function(response) {
              console.log('receiving data...');
              // Continuously update stream with data
              var body = '';
              response.on('data', function(d) {
                body += d;
              });
              response.on('end', function() {
                console.log('got all the data from unlock places');
                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                console.log('parsed.features',parsed.features);
                console.log(parsed.features.properties);
              });
              
          });
        }
      }

      // console.log(results);
      // res.writeHead({status:200});
      res.send(results);
    });
},
  createUserTable: function(req,res) {
    console.log('heard a request to createUserTable');
    //this currently gets all the data, and groups it by user. 
    //format of a few users:
    /*
    "punker76":{"languages":{"C#":1}},"Fatiatum":{"languages":{"Prolog":1}},"nvahrenb":{"languages":{"C":1}}
    */
    //the response formats it as json, but we can just access it as a pojo. 
    //TODO: create a Users table
    //TODO: insert this data into the users table. 
    var getAllDataSql = 'SELECT * FROM raw_data_import';
    db.query(getAllDataSql, function(err, results){
      if(err) {
        console.error(err);
      } else {
        console.log('got data back from table. processing now');
        var users = {};
        // console.log('results from db query', results);
        for(var i = 0; i < results.length; i++) {
          var cUser = results[i].user_login;
          var cLang = results[i].repository_language;
          if(cUser === 'constructor') {
            console.log('this is a function!');
            console.log('cUser',cUser);
            console.log('results[i]', results[i])
          }
          if( !users[cUser] ) {
            users[cUser] = {
              languages: {},
            };
          } 
          // console.log(users[cUser]);
          if(!users[cUser].languages[cLang]) {
            users[cUser].languages[cLang] = 1;
          } else {
            users[cUser].languages[cLang] += 1;
          }
        }
        console.log('sending users hash back to the browser');
        res.send(users);
      }
    })

  },
    convertLatLongToCountry: function(req,res) {
    var dbErrorObj = {};
    var geoNamesErrorObj = {};
    var successfulRows = {};
    console.log('heard a request to convertLatLongToCountry!');
    var i = 69185;

    var interval = setInterval(function() {
      i++;

      var rowNum = i;
      var sqlQuery = 'SELECT * FROM placesWithGeo WHERE ID= ' + rowNum;

      if(i >= 84915) {
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
            var urlString = 'http://ws.geonames.org/countryCode?lat=' + lat + '&lng=' + long + '&username=tinytim';

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
  }
  // post: function (message, res) {
  //   getUserID({message: message, res: res})
  //   .then(getRoomID)
  //   .then(postMessageToDB)
  //   .catch(function(err, res) {
  //     res.status(404).send();
  //   });
  // } // a function which can be used to insert a message into the database
}