var AppDispatcher = require('../dispatcher/AppDispatcher');
var DevSearchConstants = require('../constants/DevSearchConstants');


var DevSearchActions = {
 
 displayLanguageData: function(language) {
   AppDispatcher.handleViewAction({
     actionType: 'DISPLAY_LANGUAGE_DATA',
     language: language
   });
 },

 displayCountryData: function(country) {
   console.log('heard a displayCountryData in DevSearchActions!', country)
   AppDispatcher.handleViewAction({
     actionType: 'DISPLAY_COUNTRY_DATA',
     country: country
   });
 },

 displayGithubHandles: function(country,language) {
   console.log('heard a displayGithubHandles in DevSearchActions!', country, language);
   AppDispatcher.handleViewAction({
     actionType: 'DISPLAY_GITHUB_HANDLES',
     country: country,
     language: language
   });
 },

 switchWorkflow: function(workflow) {
   console.log('heard a switchWorkflow in DevSearchActions!', workflow);
   AppDispatcher.handleViewAction({
     actionType: 'SWITCH_WORKFLOW',
     workflow: workflow
   }); 
 }

};

module.exports = DevSearchActions;
