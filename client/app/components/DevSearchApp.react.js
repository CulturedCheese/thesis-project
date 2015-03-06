var React = require('react');
var DevSearchStore = require('../stores/DevSearchStore');
var MainSection = require('./MainSection.react');
var Map = require('./Map.react');
var Profiles = require('./Profiles.react');
//This component operates as a "Controller-View".  It listens for changes in
//the DevSearchStore and passes the new data to its children.

//this gets the country data **as it already exists in the store** 
//this does not make a new api call to the server, only to the store.
function getDevSearchState() {
  var initialWorkflowData = DevSearchStore.getInitialWorkflowData() || {};
  var countrySpecificData = DevSearchStore.getFormattedCountryData() || {};
  var sortedCountriesByLanguageTop10 = DevSearchStore.getTop10CountriesByLanguage() || [];
  var workflow = DevSearchStore.getWorkflow();
  return {
    sortedCountriesByLanguageTop10: sortedCountriesByLanguageTop10, 
    countrySpecificData: countrySpecificData,
    initialWorkflowData: initialWorkflowData,
    workflow: workflow
  };
}

//this tells the store to make an api request for new data from the server
function requestCountrySpecificData() {
  DevSearchStore.getCountryDataFromServer();
  DevSearchStore.getDeveloperCountByCountryFromServer();
  DevSearchStore.getDeveloperCountByLanguageFromServer();
}

var DevSearchApp = React.createClass({

  getInitialState: function() {
    requestCountrySpecificData();
    DevSearchStore.formatInitialWorkflowData();
    DevSearchStore.formatCountryData();
    return getDevSearchState();
  },

  componentDidMount: function() {
    DevSearchStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getDevSearchState());
    //We have to force it to render after updating the state to make sure to pass the new data down to the sub components. 
    this.render();
  },

  render: function() {
  	return (
      <div>
        <MainSection 
          countrySpecificData={this.state.countrySpecificData} 
          sortedCountriesByLanguageTop10={this.state.sortedCountriesByLanguageTop10}
          initialWorkflowData = { this.state.initialWorkflowData }
          workflow={this.state.workflow} />
      </div>
  	);
  }

});

module.exports = DevSearchApp;
