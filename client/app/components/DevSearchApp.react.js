var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var Map = require('./Map.react');
var React = require('react');
var DevSearchStore = require('../stores/DevSearchStore');
/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the DevSearchStore and passes the new data to its children.
 */

//get the countryData from the store
function getDevSearchState() {
  var countryData = DevSearchStore.getMockData();
  return {
    countryData: countryData
  };
}

var DevSearchApp = React.createClass({

  getInitialState: function() {
    return getDevSearchState();
  },

  //the component mounting/unmounting functions are purely placeholders. 
  // componentDidMount: function() {
  //   DevSearchStore.addChangeListener(this._onChange);
  // },

  // componentWillUnmount: function() {
  //   DevSearchStore.removeChangeListener(this._onChange);
  // },

  render: function() {
  	return (
      <div>
        <Header />
        <MainSection countryData={this.state.countryData} />
        <Footer />
      </div>
  	);
  },

  //Event handler for 'change' events coming from the DevSearchStore
  //We are not sure that this works yet- it's just legacy code right now.
  _onChange: function() {
    this.setState(getDevSearchState());
  }

});

module.exports = DevSearchApp;
