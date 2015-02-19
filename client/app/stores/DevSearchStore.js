/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * DevSearchStore

 */


var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DevSearchConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');
//require server connections??

var CHANGE_EVENT = 'change';

// var mockData = {};

var mockData = {
  "BRN":{"fillKey":"JavaScript","allLangs":[["JavaScript",3],["Visual Basic",3],["PHP",1]]},
  "THA":{"fillKey":"JavaScript","allLangs":[["JavaScript",2574],["Python",1108],["PHP",922],["Java",862],["CSS",717],["Ruby",686],["Objective-C",583],["C",356],["Shell",306],["Go",295],["C++",253],["Swift",146],["CoffeeScript",138],["C#",115],["Logos",95],["VimL",85],["Scala",84],["Perl",51],["Clojure",45],["Emacs Lisp",43],["Makefile",36],["Lua",29],["Bison",28],["Puppet",27],["R",26],["TeX",25],["Arduino",18],["Elixir",18],["Common Lisp",16],["Objective-C++",14],["PowerShell",13],["Erlang",11],["Haskell",9],["Haxe",9],["Rust",9],["IDL",8],["XSLT",8],["TypeScript",6],["Frege",5],["Groovy",5],["Vala",5],["Hy",4],["VCL",4],["Assembly",2],["F#",2],["Matlab",2],["Visual Basic",2],["Elm",1],["Nimrod",1],["Racket",1]]},
  "USA":{"fillKey":"JavaScript","allLangs":[["JavaScript",247330],["Python",91253],["Ruby",89597],["CSS",67692],["Java",56016],["Go",38898],["PHP",35065],["C",33732],["Objective-C",31845],["C++",31777],["Shell",29214],["C#",16234],["CoffeeScript",14271],["VimL",10766],["R",10087],["Swift",9274],["Scala",7916],["Clojure",7344],["Rust",5872],["Perl",5562],["Haskell",5128],["Emacs Lisp",5109],["TeX",3596],["Lua",2766],["Makefile",2453],["Julia",2055],["Erlang",1958],["Groovy",1784],["Bison",1666],["Arduino",1658],["Puppet",1616],["Matlab",1470],["PowerShell",1357],["OCaml",1336],["TypeScript",1293],["Elixir",1232]]}
};






/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

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

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var DevSearchStore 
= assign({}, EventEmitter.prototype, {

  getMockData: function() {
    return mockData;
  },

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
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

  switch(action.actionType) {
    case DevSearchConstants.DEVSEARCH_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      DevSearchStore.emitChange();
      break;

    // case DevSearchConstants.DEVSEARCH_TOGGLE_COMPLETE_ALL:
    //   if (DevSearchStore.areAllComplete()) {
    //     updateAll({complete: false});
    //   } else {
    //     updateAll({complete: true});
    //   }
    //   DevSearchStore.emitChange();
    //   break;

    case DevSearchConstants.DEVSEARCH_UNDO_COMPLETE:
      update(action.id, {complete: false});
      DevSearchStore.emitChange();
      break;

    case DevSearchConstants.DEVSEARCH_COMPLETE:
      update(action.id, {complete: true});
      DevSearchStore.emitChange();
      break;

    case DevSearchConstants.DEVSEARCH_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
      }
      DevSearchStore.emitChange();
      break;

    case DevSearchConstants.DEVSEARCH_DESTROY:
      destroy(action.id);
      DevSearchStore.emitChange();
      break;

    case DevSearchConstants.DEVSEARCH_DESTROY_COMPLETED:
      destroyCompleted();
      DevSearchStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = DevSearchStore;

