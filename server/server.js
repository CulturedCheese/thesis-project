var express = require('express');

var app = express();
var port = process.env.PORT || 7203;

app.listen(port);
console.log('Server now listening on port ' + port);

// configure server with middleware and routing
require('./config/middleware.js')(app, express);

// export app for testing and flexibility
module.exports = app;
