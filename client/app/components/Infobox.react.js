var React = require('react');
var DevSearchActions = require('../actions/DevSearchActions');
var LanguageSubBox = require('./LanguageSubBox.react');
var CountrySubBox = require('./CountrySubBox.react');

var Infobox = React.createClass({
  
  render: function() {

  	return (
      <section id="infobox">
        <button><a href="#features">Hire Coders</a></button>
      	<LanguageSubBox sortedCountriesByLanguageTop10={this.props.sortedCountriesByLanguageTop10} />
      	<CountrySubBox countryData={this.props.countryData} developersByCountryData={this.props.developersByCountryData} />   
      </section>
    );
  },
});

module.exports = Infobox;
