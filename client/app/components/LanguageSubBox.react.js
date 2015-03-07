var React = require('react');
var DevSearchStore = require('../stores/DevSearchStore');

var getLanguageFromStore = function(){
  return DevSearchStore.getLanguage();
};

var LanguageSubBox = React.createClass({

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render: function() {
    var count = 0;
    var language = getLanguageFromStore();
    console.log("lang", language);
  	var results = this.props.sortedCountriesByLanguageTop10;
    console.log(this.props);
    var formattedNums = results.map(function(country){
      var returnObj = {};
      console.log("Hi", count)
      returnObj.countryName = country.countryName;
      returnObj.activeProgrammers = country.activeProgrammers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      returnObj.count = ++count;
      return returnObj;
    });
    return (
      <div id="languagesubbox">
        <h1><b>Language:</b></h1> 
        <h1><b>{language}</b></h1>
        <h2>(# Developers)</h2>  
        <div> {formattedNums.map(function(country) {
          return (
              <div>{country.count}. {country.countryName}: ({country.activeProgrammers})</div>
        	);
        })}
        </div> 
      </div>
    );
  }

});

module.exports = LanguageSubBox;
