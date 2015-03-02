var express = require('express');
var dataProcessingRouter = express.Router();
var dataProcessingLogic = require('./dataProcessingLogic.js');

dataProcessingRouter.get('/escapeAndLoadUsersByLang', function(req, res) {
  dataProcessingLogic.escapeAndLoadUsersByLang(req,res);
});

dataProcessingRouter.get('/topDevsByCountry', function(req, res) {
  dataProcessingLogic.topDevsByCountry(req,res);
});

dataProcessingRouter.get('/getAvatarURLs', function(req, res) {
  dataProcessingLogic.getAvatarURLs(req,res);
});

module.exports = dataProcessingRouter;
