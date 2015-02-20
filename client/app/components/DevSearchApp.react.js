var Footer = require('./Footer.react');
var Header = require('./Header.react');
var Infobox = require('./Infobox.react');
var MainSection = require('./MainSection.react');
var SearchLanguageBar = require('./SearchLanguageBar.react');
var SearchCountryBar = require('./SearchCountryBar.react');
var Map = require('./Map.react');
var React = require('react');
var DevSearchStore = require('../stores/DevSearchStore');
//This component operates as a "Controller-View".  It listens for changes in
//the DevSearchStore and passes the new data to its children.

//this gets the country data **as it already exists in the store** 
//this does not make a new api call to the server, only to the store.
function getDevSearchState() {
  var countryData = DevSearchStore.getCountryDataFromStore();
  return {
    countryData: countryData
  };
}

//this tells the store to make an api request for new data from the server
function requestCountryData() {
  DevSearchStore.getCountryDataFromServer();
}

var DevSearchApp = React.createClass({

  getInitialState: function() {
    requestCountryData();
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
        <SearchLanguageBar />
        <SearchCountryBar />
        <MainSection countryData={this.state.countryData} />
        <Footer />
      </div>
  	);
  },

});

module.exports = DevSearchApp;
