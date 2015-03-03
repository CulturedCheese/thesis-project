var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfilesConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var profileData = [];
var selectedLanguage = "";
var selectedCountry = "";
var selectedSubcategory = "";
var selectedHourlyRateMax = "";
var selectedMinScore = 0;
var selectedMaxScore = 0;
var page = 0;

var ProfilesStore = assign({}, EventEmitter.prototype, {
  
  // this function grabs the next page of profiles. TODO: rename function
  getODeskData: function(page, language, country, subcategory, hourlyRateMax, minScore, maxScore) {
    
    var url =  'api/1/codersNextPage?page=' + page + '=&language=' + language + '=&country=' + country + '=&subcategory=' + subcategory + '=&hourlyRateMax=' + hourlyRateMax + '=&minScore=' + minScore + '=&maxScore=' + maxScore;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        profileData = data;
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });
  },

  getCoders: function(language,country,subcategory, hourlyRateMax, minScore, maxScore) {
    console.log("invoking getCoders");  
    var url =  'api/1/coders?page=0=&language=' + language + '=&country=' + country + '=&subcategory=' + subcategory + '=&hourlyRateMax=' + hourlyRateMax + '=&minScore=' + minScore + '=&maxScore=' + maxScore;
    selectedLanguage = language;
    selectedCountry = country; 
    selectedSubcategory = subcategory;
    selectedHourlyRateMax = hourlyRateMax;
    selectedMinScore = minScore;
    selectedMaxScore = maxScore;

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

  getNextPageFromServer: function(page, language, country, subcategory, minScore, maxScore) {
    return this.getODeskData(page, language, country, subcategory, minScore, maxScore);
  },

  getProfileDataFromServer: function(language, country, subcategory, hourlyRateMax, minScore, maxScore) {
    return this.getCoders(language,country, subcategory, hourlyRateMax, minScore, maxScore);
  },

  getProfileDataFromStore: function() {
    return profileData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
   //outgoing callbacks/changes

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // Register callback to handle all updates
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var page = action.page || 0;
    var language = action.language || 'JavaScript';
    var country = action.country || 'Thailand';
    var subcategory = action.subcategory || 'Web Development';
    var hourlyRateMax = action.hourlyRateMax || '100';
    var minScore = action.minScore || 0;
    var maxScore = action.maxScore || 5;

    console.log(action.actionType);
    //incoming callbacks/changes
    switch(action.actionType) {
      case 'PROFILES_NEXT_PAGE':
        console.log('invoking PROFILES_NEXT_PAGE');
        ProfilesStore.getNextPageFromServer(page, selectedLanguage, selectedCountry, selectedSubcategory, selectedHourlyRateMax, selectedMinScore, selectedMaxScore);
        ProfilesStore.emitChange();
        break;
      case 'GET_CODERS':
        console.log('invoking GET_CODERS');
        ProfilesStore.getProfileDataFromServer(language, country, subcategory, hourlyRateMax, minScore, maxScore);
        ProfilesStore.emitChange();
        break;
    };

    // returning true indicates there are no errors
    return true;

  })
});


module.exports = ProfilesStore;
