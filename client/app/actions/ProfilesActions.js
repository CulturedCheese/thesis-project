var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfilesConstants = require('../constants/ProfilesConstants');

var ProfilesActions = {

  nextPage: function(page) {
    console.log('heard a nextPage in ProfilesActions!')
    AppDispatcher.handleViewAction({
      actionType: 'PROFILES_NEXT_PAGE',
      page: page
    });
  }

};

module.exports = ProfilesActions;