var express = require('express');
var dataProcessingRouter = express.Router();
var dataProcessingLogic = require('./dataProcessingLogic.js');

dataProcessingRouter.get('/escapeAndLoadUsersByLang', function(req, res) {
  dataProcessingLogic.escapeAndLoadUsersByLang(req,res);
});

module.exports = dataProcessingRouter;
