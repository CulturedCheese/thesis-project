var React = require('react');

var Map = React.createClass({


  render: function() {
    var map = new Datamap({
      element: document.getElementById('d3Map'),
      data: this.props.countryData
      // responsive: true
    });

    return (
      <span></span>
    );
  },

});

module.exports = Map;
