var React = require('react');

var LanguageSubBox = React.createClass({

  render: function() {
  	var results = this.props.sortedCountriesByLanguageTop10;
    console.log(results);
  	return (
      <div id="languagesubbox">
        {results.map(function(country) {
        	return (
              <p>{country.countryName} has {country.activeProgrammers} {country.language} developers</p>
        	);
        })}
      </div>
    );
  }

});

module.exports = LanguageSubBox;
