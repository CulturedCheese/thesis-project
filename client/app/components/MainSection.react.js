var React = require('react');
var ReactPropTypes = React.PropTypes;
var SearchLanguageBar = require('./SearchLanguageBar.react');
var SearchCountryBar = require('./SearchCountryBar.react');
var DevSearchActions = require('../actions/DevSearchActions');
var Map = require('./Map.react');
var Infobox = require('./Infobox.react');

var MainSection = React.createClass({

  render: function() {
    return (
      <section id="main">
	      <SearchLanguageBar />
	      <SearchCountryBar />      
	      <Map 
          countrySpecificData={this.props.countrySpecificData} 
          sortedCountriesByLanguageTop10={this.props.sortedCountriesByLanguageTop10}/>
	      <Infobox 
          countrySpecificData={this.props.countrySpecificData} 
          sortedCountriesByLanguageTop10={this.props.sortedCountriesByLanguageTop10} />
      </section>
    );
  },

});

module.exports = MainSection;
