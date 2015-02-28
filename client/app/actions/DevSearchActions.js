var AppDispatcher = require('../dispatcher/AppDispatcher');
var DevSearchConstants = require('../constants/DevSearchConstants');


var DevSearchActions = {
  displayLanguageData: function(language) {
    AppDispatcher.handleViewAction({
      actionType: 'DISPLAY_LANGUAGE_DATA',
      language: language
    });
  }
};

module.exports = DevSearchActions;
