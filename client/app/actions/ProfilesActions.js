var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfilesConstants = require('../constants/ProfilesConstants');

var ProfilesActions = {

  nextPage: function(page) {
    console.log('heard a nextPage in ProfilesActions!')
    AppDispatcher.handleViewAction({
      actionType: 'PROFILES_NEXT_PAGE',
      page: page
    });
  },

  getCoders: function(language, country, subcategory, hourlyRateMax, minScore, maxScore) {
    console.log('heard a getCoders in ProfilesActions!')
    AppDispatcher.handleViewAction({
      actionType: 'GET_CODERS',
      language: language,
      country: country,
      subcategory: subcategory,
      hourlyRateMax: hourlyRateMax,
      minScore: minScore,
      maxScore: maxScore
    });
  }

};

module.exports = ProfilesActions;
