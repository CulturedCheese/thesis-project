var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DevSearchConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');
//require server connections??

var CHANGE_EVENT = 'change';

var mockData = {
  "BRN":{"fillKey":"JavaScript","allLangs":[["JavaScript",3],["Visual Basic",3],["PHP",1]]},
  "THA":{"fillKey":"JavaScript","allLangs":[["JavaScript",2574],["Python",1108],["PHP",922],["Java",862],["CSS",717],["Ruby",686],["Objective-C",583],["C",356],["Shell",306],["Go",295],["C++",253],["Swift",146],["CoffeeScript",138],["C#",115],["Logos",95],["VimL",85],["Scala",84],["Perl",51],["Clojure",45],["Emacs Lisp",43],["Makefile",36],["Lua",29],["Bison",28],["Puppet",27],["R",26],["TeX",25],["Arduino",18],["Elixir",18],["Common Lisp",16],["Objective-C++",14],["PowerShell",13],["Erlang",11],["Haskell",9],["Haxe",9],["Rust",9],["IDL",8],["XSLT",8],["TypeScript",6],["Frege",5],["Groovy",5],["Vala",5],["Hy",4],["VCL",4],["Assembly",2],["F#",2],["Matlab",2],["Visual Basic",2],["Elm",1],["Nimrod",1],["Racket",1]]},
  "USA":{"fillKey":"JavaScript","allLangs":[["JavaScript",247330],["Python",91253],["Ruby",89597],["CSS",67692],["Java",56016],["Go",38898],["PHP",35065],["C",33732],["Objective-C",31845],["C++",31777],["Shell",29214],["C#",16234],["CoffeeScript",14271],["VimL",10766],["R",10087],["Swift",9274],["Scala",7916],["Clojure",7344],["Rust",5872],["Perl",5562],["Haskell",5128],["Emacs Lisp",5109],["TeX",3596],["Lua",2766],["Makefile",2453],["Julia",2055],["Erlang",1958],["Groovy",1784],["Bison",1666],["Arduino",1658],["Puppet",1616],["Matlab",1470],["PowerShell",1357],["OCaml",1336],["TypeScript",1293],["Elixir",1232]]}
};

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

var DevSearchStore = assign({}, EventEmitter.prototype, {
  getCountryData: function() {
    //ajax request to the server
    //server returns a json of all the countries, much like our mock data above.
  },

  getLanguageData: function(language) {
    //ajax request with the language
    //server return a formatted json with only information for that langauge
    //or maybe we build that logic into the client, right here in this function
  },

  getContractorData: function(country) {
    //invokes getOdeskData and geteLanceData()
  }, 

  getODeskData: function(country) {
    //make api calls to get the oDesk data
  },

  geteLanceData: function(country) {
    //make api calls to get the oDesk data
  },

  getMockData: function() {
    return mockData;
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

    case DevSearchConstants.DEVSEARCH_TOGGLE_COMPLETE_ALL:
      if (DevSearchStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      DevSearchStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = DevSearchStore;
