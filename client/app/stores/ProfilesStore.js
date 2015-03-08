var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfilesConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var profileData = [];
var selectedLanguage = "";
var selectedCountry = "";
var selectedHourlyRateMax = "";
var selectedMinScore = 0;
var selectedMaxScore = 0;
var page = 0;

var ProfilesStore = assign({}, EventEmitter.prototype, {
  
  getProfileDataFromServer: function(language, country, hourlyRateMax, minScore, maxScore, page) {
    return this.getCoders(language,country, hourlyRateMax, minScore, maxScore, page);
  },

  getCoders: function(language,country, hourlyRateMax, minScore, maxScore, page) {
    selectedLanguage = language;
    selectedCountry = country; 
    selectedHourlyRateMax = hourlyRateMax;
    selectedMinScore = minScore;
    selectedMaxScore = maxScore;
    page = page || 0;
    var url =  'api/1/coders?page=' + page + '=&language=' + language + '=&country=' + country + '=&hourlyRateMax=' + hourlyRateMax + '=&minScore=' + minScore + '=&maxScore=' + maxScore;

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log('hey there', data);
        profileData = data;
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });

  },

  getProfileDataFromStore: function() {
    return profileData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // Register callback to handle all updates
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var language = action.language || 'JavaScript';
    var country = action.country || 'Thailand';
    var hourlyRateMax = action.hourlyRateMax || '100';
    var minScore = action.minScore || 0;
    var maxScore = action.maxScore || 5;
    var page = action.page || 0;

    //incoming callbacks/changes
    switch(action.actionType) {
      case 'GET_CODERS':
        ProfilesStore.getProfileDataFromServer(language, country, hourlyRateMax, minScore, maxScore);
        ProfilesStore.emitChange();
        break;
      case 'PROFILES_NEXT_PAGE':
        ProfilesStore.getProfileDataFromServer(selectedLanguage, selectedCountry, selectedHourlyRateMax, selectedMinScore, selectedMaxScore, page);
        ProfilesStore.emitChange();
        break;
    };

    // returning true indicates there are no errors
    return true;

  })
});

module.exports = ProfilesStore;
