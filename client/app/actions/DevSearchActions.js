/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DevSearchConstants = require('../constants/DevSearchConstants');

var DevSearchActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: DevSearchConstants.DEVSEARCH_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: DevSearchConstants.DEVSEARCH_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    if (todo.complete) {
      AppDispatcher.dispatch({
        actionType: DevSearchConstants.DEVSEARCH_UNDO_COMPLETE,
        id: id
      });
    } else {
      AppDispatcher.dispatch({
        actionType: DevSearchConstants.DEVSEARCH_COMPLETE,
        id: id
      });
    }
  },

  
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: DevSearchConstants.DEVSEARCH_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: DevSearchConstants.DEVSEARCH_DESTROY,
      id: id
    });
  },

  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: DevSearchConstants.DEVSEARCH_DESTROY_COMPLETED
    });
  }

};

module.exports = DevSearchActions;
