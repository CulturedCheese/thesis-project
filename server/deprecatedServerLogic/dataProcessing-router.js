var express = require('express');
var dataProcessingRouter = express.Router();
var dataProcessingLogic = require('./dataProcessingLogic.js');

//I like having explicit paths hardcoded in here as a list of available api options
//this also throws errors more quickly and obviously for debugging
dataProcessingRouter.get('/', function (req, res) {
  dataProcessingLogic.get(req, res);
});

dataProcessingRouter.use(express.static(__dirname));

dataProcessingRouter.get('/createUserTable', function(req, res) {
  dataProcessingLogic.createUserTable(req, res);
});

dataProcessingRouter.get('/convertLatLongToCountry', function(req, res) {
  dataProcessingLogic.convertLatLongToCountry(req, res);
});

dataProcessingRouter.get('/convertLatLongToCountryOnlyNull', function(req, res) {
  dataProcessingLogic.convertLatLongToCountryOnlyNull(req, res);
});

dataProcessingRouter.get('/convertLatLongToCountryCleaning', function(req, res) {
  dataProcessingLogic.convertLatLongToCountryCleaning(req, res);
});

dataProcessingRouter.get('/groupByAttempt', function(req, res) {
  dataProcessingLogic.groupByAttempt(req, res);
});

dataProcessingRouter.get('/insertCountryToDB', function(req, res) {
  dataProcessingLogic.insertCountryToDB(req, res);
});

dataProcessingRouter.get('/googleMapsTest', function(req, res) {
  dataProcessingLogic.googleMapsTest(req, res);
});

module.exports = dataProcessingRouter;
