var express = require('express');

var app = express();
var port = process.env.PORT || 7203;

app.listen(port);
console.log('Server now listening on port ' + port);

// configure server with middleware and routing
require('./config/middleware.js')(app, express);

// export app for testing and flexibility
module.exports = app;


/* Walkthrough of the server
Express our server are initialized here.
Next, we then inject the server and express into our config/middlware.js file for setup.
We also exported our server for easy testing.
middleware.js requires all express middlware and sets it up
We also create individual routers for our main features.
each feature has it's own folder with a model, controller, and route file
  the respective file is required in middleware.js and injected with its mini router
  that route file then requires the respective controller and sets up all the routes
  that controller then requires the respective model and sets up all our endpoints which respond to request */