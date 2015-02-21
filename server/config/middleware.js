'use strict';

var morgan      = require('morgan'); // used for logging incoming request
var bodyParser  = require('body-parser');
var helpers     = require('./helpers.js'); // our custom middleware
var apiRouter   = require('../api/api-router.js'); //client-server api
var dataProcessingRouter = require('../dataProcessing/dataProcessing-router.js');
var path        = require('path')


module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // Express 4 allows us to use multiple routers with their own configurations
  // TODO: load routers based on request urls
  // Example: app.use('/api/users', userRouter);
  // use user router for all user request

  app.use(express.static(path.join(__dirname + '../../../dist')));
  //router for all of our client-server api endpoints
  app.use('/api', apiRouter); 
    //this router is only used once when we import the data
  app.use('/dataProcessing', dataProcessingRouter); //router for all of our internal data processing
};
