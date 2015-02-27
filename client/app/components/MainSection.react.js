var React = require('react');
var ReactPropTypes = React.PropTypes;
var SearchLanguageBar = require('./SearchLanguageBar.react');
var SearchCountryBar = require('./SearchCountryBar.react');
var DevSearchActions = require('../actions/DevSearchActions');
var Map = require('./Map.react');


var MainSection = React.createClass({

  render: function() {
    return (      
      <section id="main">
      	<SearchLanguageBar />
        <SearchCountryBar />
        <Map countryData={this.props.countryData} />
      </section>
    );
  },

});

module.exports = MainSection;
