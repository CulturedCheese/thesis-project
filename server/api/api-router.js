var express = require('express');
var apiRouter = express.Router();
var v1Router = require('./1/api-router.js');

//We are creating version 1 of our api 
//creating versioning for our api let's us rewrite our api more easily later
//all this means is that we'll call '/api/1/getAllData' instead of 'api/getAllData'

apiRouter.use('/1', v1Router);

module.exports = apiRouter;
