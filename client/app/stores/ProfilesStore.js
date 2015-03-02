var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfilesConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var profileData = [];
var selectedLanguage = "";
var selectedCountry = "";
var page = 0;

var ProfilesStore = assign({}, EventEmitter.prototype, {
  
  // this function grabs the next page of profiles. TODO: rename function
  getODeskData: function(page, language, country) {
    
    var url =  'api/1/codersNextPage?page=' + page + '=&language=' + selectedLanguage + '=&country=' + selectedCountry;

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

  getCodersByLanguageByCountry: function(language,country) {
    console.log("invoking getCodersByLanguageByCountry");  
    var url =  'api/1/codersByLanguageByCountry?page=0=&language=' + language + '=&country=' + country;
    selectedLanguage = language;
    selectedCountry = country; 
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

  getProfileDataFromServer: function(page, language, country) {
    return this.getODeskData(page, language, country);
  },

  getProfileDataFromServerLangCountry: function(language, country) {
    return this.getCodersByLanguageByCountry(language,country);
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

    console.log(action.actionType);
    //incoming callbacks/changes
    switch(action.actionType) {
      case 'PROFILES_NEXT_PAGE':
        console.log('invoking PROFILES_NEXT_PAGE');
        ProfilesStore.getProfileDataFromServer(page, selectedLanguage, selectedCountry);
        ProfilesStore.emitChange();
        break;
      case 'GET_CODERS':
        console.log('invoking GET_CODERS');
        ProfilesStore.getProfileDataFromServerLangCountry(language, country);
        ProfilesStore.emitChange();
        break;
    };

    // returning true indicates there are no errors
    return true;

  })
});


module.exports = ProfilesStore;
