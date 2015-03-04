var React = require('react');
var ReactPropTypes = React.PropTypes;
var SearchCountryBar = require('./SearchCountryBar.react');
var SearchLanguageBar = require('./SearchLanguageBar.react');
var SelectWorkflowBar = require('./SelectWorkflowBar.react');
var DevSearchActions = require('../actions/DevSearchActions');
var Map = require('./Map.react');
var Infobox = require('./Infobox.react');

var MainSection = React.createClass({

  render: function() {
    return (
      <section id="main">
        <SelectWorkflowBar />
        <br />
        <br />
        <br />
        <br />
	      <SearchLanguageBar />
	      <SearchCountryBar />      
	      <Map 
          countrySpecificData={this.props.countrySpecificData} 
          sortedCountriesByLanguageTop10={this.props.sortedCountriesByLanguageTop10}
          workflow={this.props.workflow} />
	      <Infobox 
          countrySpecificData={this.props.countrySpecificData} 
          sortedCountriesByLanguageTop10={this.props.sortedCountriesByLanguageTop10} 
          workflow={this.props.workflow} />
      </section>
    );
  },

});

module.exports = MainSection;
