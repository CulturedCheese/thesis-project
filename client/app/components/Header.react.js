var React = require('react');
var DevSearchActions = require('../actions/DevSearchActions');
var SearchLanguageBar = require('./SearchLanguageBar.react');
var SearchCountryBar = require('./SearchCountryBar.react');

var Header = React.createClass({

  render: function() {
    return (
      <header id="header">
        <SearchLanguageBar
          id="search-language"
          placeholder="Search programming language"
          onSave={this._onSave} />
        <SearchCountryBar
          id="search-country"
          placeholder="Search country"
          onSave={this._onSave} />
      </header>
    );
  },

  //legacy code below
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    // if (text.trim()){
    //   DevSearchActions.create(text);
    // }
  }

});

module.exports = Header;
