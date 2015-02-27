var React = require('react');
var DevSearchStore = require('../stores/DevSearchStore');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var Map = require('./Map.react');
var Profiles = require('./Profiles.react');
var Footer = require('./Footer.react');
//This component operates as a "Controller-View".  It listens for changes in
//the DevSearchStore and passes the new data to its children.

//this gets the country data **as it already exists in the store** 
//this does not make a new api call to the server, only to the store.
function getDevSearchState() {
  var countryData = DevSearchStore.getCountryDataFromStore();
  // var profileData = DevSearchStore.getProfileDataFromStore();
  return {
    countryData: countryData
    // profileData: profileData
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
        <MainSection countryData={this.state.countryData} />
      </div>
  	);
  },

});

module.exports = DevSearchApp;
