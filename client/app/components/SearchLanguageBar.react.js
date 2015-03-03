var DevSearchActions = require('../actions/DevSearchActions');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchLanguageBar = React.createClass({
	
	getInitialState: function() {
    return {language: '' };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var language = this.refs.text.getDOMNode().value;
    DevSearchActions.displayLanguageData(language);
    this.refs.text.getDOMNode().value = '';
  },

  render: function() {
    return (
      <form id="search-language" onSubmit={this.handleSubmit} >
          <input type="text" placeholder=" Search by language..." id="ajax" list="json-datalist" ref="text"/>
          <input type="submit" value="submit" />
          <datalist id="json-datalist"></datalist>
      </form>
    );
  }

});

module.exports = SearchLanguageBar;
