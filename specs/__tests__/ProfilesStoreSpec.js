'use strict';
/** @jsx React.DOM */

jest.dontMock('../../client/app/stores/ProfilesStore');
jest.dontMock('object-assign');

describe('ProfilesStore', function() {

  // var TodoConstants = require('../../constants/TodoConstants');
  var AppDispatcher;
  var ProfilesStore;
  var callback;

  // mock actions 
  var actionGetCoders = {
    actionType: 'GET_CODERS',
    language: 'JavaScript',
    country: 'Thailand',
    subcategory: 'Web Development',
    hourlyRateMax: 100,
    minScore: 0,
    maxScore: 5
  };

  var actionProfilesNextPage = {
    actionType: 'PROFILES_NEXT_PAGE',
    page: 0
  };

  beforeEach(function() {
    AppDispatcher = require('../../client/app/dispatcher/AppDispatcher');
    TodoStore = require('../../client/app/stores/ProfilesStore');
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
});
