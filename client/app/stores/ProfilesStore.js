var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DevSearchConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var profileData = [];
/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

var ProfilesStore = assign({}, EventEmitter.prototype, {

  getODeskData: function(page) {
    console.log(arguments);
    $.ajax({
      url: 'api/1/odeskByCountry',
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
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  //incoming callbacks/changes

  switch(action.actionType) {

    case DevSearchConstants.DEVSEARCH_TOGGLE_COMPLETE_ALL:
      if (ProfilesStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      ProfilesStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ProfilesStore;
