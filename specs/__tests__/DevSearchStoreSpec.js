'use strict';
/** @jsx React.DOM */

jest.dontMock('../../client/app/stores/DevSearchStore');
jest.dontMock('object-assign');

describe('DevSearchStore', function() {

  // var TodoConstants = require('../../constants/TodoConstants');
  var AppDispatcher;
  var DevSearchStore;
  var callback;

  // mock actions 
  var actionDisplayLanguageData = {
    actionType: 'DISPLAY_LANGUAGE_DATA',
    input: 'Ruby'
  };

  var actionDisplayCountryData = {
    actionType: 'DISPLAY_COUNTRY_DATA',
    input: 'Jamaica'
  };

  var actionSwitchWorkflow = {
    actionType: 'SWITCH_WORKFLOW',
    workflow: 'initialWorkflow'
  };

  beforeEach(function() {
    AppDispatcher = require('../../client/app/dispatcher/AppDispatcher');
    TodoStore = require('../../client/app/stores/DevSearchStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('', function() {

  });

  it('', function() {

  });

  it('', function() {

  });

  it('', function() {

  });

  it('', function() {

  });
  // it('initializes with initialWorkflow', function() {
  //   var all = TodoStore.getAll();
  //   expect(all).toEqual({});
  // });

  // it('creates a to-do item', function() {
  //   callback(actionTodoCreate);
  //   var all = TodoStore.getAll();
  //   var keys = Object.keys(all);
  //   expect(keys.length).toBe(1);
  //   expect(all[keys[0]].text).toEqual('foo');
  // });

  // it('destroys a to-do item', function() {
  //   callback(actionTodoCreate);
  //   var all = TodoStore.getAll();
  //   var keys = Object.keys(all);
  //   expect(keys.length).toBe(1);
  //   actionTodoDestroy.id = keys[0];
  //   callback(actionTodoDestroy);
  //   expect(all[keys[0]]).toBeUndefined();
  // });

  // it('determines whether all to-do items are complete', function() {
  //   var i = 0;
  //   for (; i < 3; i++) {
  //     callback(mockTodoCreate);
  //   }
  //   expect(TodoStore.areAllComplete()).toBe(false);

  //   var all = TodoStore.getAll();
  //   for (key in all) {
  //     callback({
  //       source: 'VIEW_ACTION',
  //       action: {
  //         actionType: TodoConstants.TODO_COMPLETE,
  //         id: key
  //       }
  //     });
  //   }
  //   expect(TodoStore.areAllComplete()).toBe(true);

  //   callback({
  //     source: 'VIEW_ACTION',
  //     action: {
  //       actionType: TodoConstants.TODO_UNDO_COMPLETE,
  //       id: key
  //     }
  //   });
  //   expect(TodoStore.areAllComplete()).toBe(false);
  // });
});
