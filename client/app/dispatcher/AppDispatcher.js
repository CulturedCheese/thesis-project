var Dispatcher = require('flux').Dispatcher;

var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    console.log("here's the payload", payload);
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;




