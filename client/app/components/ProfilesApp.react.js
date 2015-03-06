var React = require('react');
var ProfilesStore = require('../stores/ProfilesStore');
var Profiles = require('./Profiles.react');

//This component operates as a "Controller-View".  It listens for changes in
//the DevSearchStore and passes the new data to its children.

//this gets the country data **as it already exists in the store** 
//this does not make a new api call to the server, only to the store.
function getProfilesState() {
  return {
    profileData: ProfilesStore.getProfileDataFromStore()
  };
}

//this tells the store to make an api request for new data from the server
function requestProfilesData(page) {
  ProfilesStore.getProfileDataFromServer(page);
}

var ProfilesApp = React.createClass({

  getInitialState: function() {
    requestProfilesData();
    return getProfilesState();
  },

  componentDidMount: function() {
    ProfilesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProfilesStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getProfilesState());
    //We have to force it to render after updating the state to make sure to pass the new data down to the sub components. 
    this.render();
  },

  render: function() {
  	return (
      <div>
        <Profiles profileData = {this.state.profileData} />
      </div>
  	);
  }

});

module.exports = ProfilesApp;
