/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var DevSearchActions = require('../actions/DevSearchActions');
var SearchLanguageInput = require('./SearchLanguageInput.react');
var SearchCountryInput = require('./SearchCountryInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>DevTracker</h1>
        <SearchLanguageInput
          id="search-language"
          placeholder="Programming language?"
          onSave={this._onSave} />
        <SearchCountryInput
          id="search-country"
          placeholder="Country?"
          onSave={this._onSave}
        />
      </header>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      DevSearchActions.create(text);
    }

  }

});

module.exports = Header;
