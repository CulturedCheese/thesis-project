var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfilesConstants = require('../constants/ProfilesConstants');

var ProfilesActions = {

  getCoders: function(language, country, hourlyRateMax, minScore, maxScore) {
    AppDispatcher.handleViewAction({
      actionType: 'GET_CODERS',
      language: language,
      country: country,
      hourlyRateMax: hourlyRateMax,
      minScore: minScore,
      maxScore: maxScore
    });
  },

  nextPage: function(page) {
    AppDispatcher.handleViewAction({
      actionType: 'PROFILES_NEXT_PAGE',
      page: page
    });
  }
};

module.exports = ProfilesActions;
