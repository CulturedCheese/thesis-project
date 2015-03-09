var React = require('react');
var ReactPropTypes = React.PropTypes;
var SearchCountryBar = require('./SearchCountryBar.react');
var SearchInitialBar = require('./SearchInitialBar.react');
var SearchLanguageBar = require('./SearchLanguageBar.react');
var SelectWorkflowBar = require('./SelectWorkflowBar.react');
var DevSearchActions = require('../actions/DevSearchActions');
var Map = require('./Map.react');
var Infobox = require('./Infobox.react');

var MainSection = React.createClass({

  render: function() {
    var renderedSearchBar;
    if(this.props.workflow === "initialWorkflow") {
      renderedSearchBar = <SearchInitialBar workflow={this.props.workflow} />;
    } else if(this.props.workflow === "countryWorkflow") {
      renderedSearchBar = <SearchCountryBar workflow={this.props.workflow} />;
    } else if (this.props.workflow === "languageWorkflow") {
      renderedSearchBar = <SearchLanguageBar workflow={this.props.workflow} />;
    }
    
    return (
      <section id="main">
        <SelectWorkflowBar />
        { renderedSearchBar }
        <Map 
          countrySpecificData={this.props.countrySpecificData} 
          sortedCountriesByLanguageTop10={this.props.sortedCountriesByLanguageTop10}
          initialWorkflowData = { this.props.initialWorkflowData }
          workflow={this.props.workflow} />
        <Infobox 
          countrySpecificData={this.props.countrySpecificData} 
          sortedCountriesByLanguageTop10={this.props.sortedCountriesByLanguageTop10} 
          initialWorkflowData = { this.props.initialWorkflowData }
          workflow={this.props.workflow} />
        <img id="codertracks-map-logo" src="styles/team/codertracks-logo-black.png" alt="CoderTracks Logo Black" />
      </section>
    );
  },

});

module.exports = MainSection;
