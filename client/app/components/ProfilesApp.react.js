var React = require('react');
var ProfilesStore = require('../stores/ProfilesStore');
var Profiles = require('./Profiles.react');
var NextPage = require('./NextPage.react');
//This component operates as a "Controller-View".  It listens for changes in
//the DevSearchStore and passes the new data to its children.

//this gets the country data **as it already exists in the store** 
//this does not make a new api call to the server, only to the store.
function getProfilesState() {
  var profileData = ProfilesStore.getProfileDataFromStore();
  return {
    profileData: profileData
  };
}

//this tells the store to make an api request for new data from the server
function requestProfilesData(page) {
  ProfilesStore.getProfileDataFromServer(page);
}

var ProfilesApp = React.createClass({
  
  nextPage: function(page) {
    var updatedProfileData = this.state.profileData;
    updatedProfileData = requestProfilesData(page);
    this.setState({profileData: updatedProfileData});
  },

  getInitialState: function() {
    requestProfilesData();
    return getProfilesState();
  },

  componentDidMount: function() {
    ProfilesStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getProfilesState());
    //We have to force it to render after updating the state to make sure to pass the new data down to the sub components. 
    this.render();
  },

  render: function() {
  	return (
      <div>
        <Profiles profileData = {this.state.profileData} page = {0} />
      </div>
  	);
  },

});

module.exports = ProfilesApp;
