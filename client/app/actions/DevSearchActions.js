var AppDispatcher = require('../dispatcher/AppDispatcher');
var DevSearchConstants = require('../constants/DevSearchConstants');


var DevSearchActions = {

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

};

module.exports = DevSearchActions;
