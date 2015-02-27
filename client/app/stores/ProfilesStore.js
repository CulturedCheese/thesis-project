var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfilesConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var profileData = [];

var ProfilesStore = assign({}, EventEmitter.prototype, {

  getODeskData: function(page) {
    console.log('req looks like', page);
    
    var page = page || 0;
    var url =  'api/1/odeskByCountry?page=' + page;

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

  getProfileDataFromServer: function(page) {
    return this.getODeskData(page);
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
    var page = action.page;

    console.log(page);
    console.log(action.actionType);
    //incoming callbacks/changes
    switch(action.actionType) {
      case 'PROFILES_NEXT_PAGE':
        console.log('invoking PROFILES_NEXT_PAGE');
        ProfilesStore.getODeskData(page);
        ProfilesStore.emitChange();
        break;

    };

    // returning true indicates there are no errors
    return true;

  })
});


module.exports = ProfilesStore;
