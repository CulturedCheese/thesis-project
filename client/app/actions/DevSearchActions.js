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
 }

};

module.exports = DevSearchActions;
