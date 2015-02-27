var React = require('react');

var CountrySubBox = React.createClass({

  render: function() {
    return (
      <div className="countrysubbox">
        <h3>Country Search Results</h3>
        <p>Country</p> 
        <p>Top 10 Languages (# Active Devs)</p> 
        <p></p>
        <p></p>
        <p></p>
        <p>--------------------------------------------------------------</p>
      </div>
    );
  },

});

module.exports = CountrySubBox;