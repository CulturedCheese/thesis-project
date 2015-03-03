var DevSearchActions = require('../actions/DevSearchActions');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchCountryBar = React.createClass({

  getInitialState: function() {
    return {country: '' };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var country = this.refs.text.getDOMNode().value;
    DevSearchActions.displayCountryData(country);
    this.refs.text.getDOMNode().value = '';
  },

  render: function() {
    return (
      <form id="search-country" onSubmit={this.handleSubmit} >
        <input type="text" placeholder=" Search by country..." id="ajax2" list="json-countrylist" ref="text"/>
        <input type="submit" value="submit" />
        <datalist id="json-countrylist"></datalist>  
      </form>
    );
  },

});

module.exports = SearchCountryBar;
