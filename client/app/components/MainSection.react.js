var React = require('react');
var DevSearchActions = require('../actions/DevSearchActions');
var Map = require('./Map.react');

var MainSection = React.createClass({

  render: function() {
    return (
      <section id="main">
        <Map countryData={this.props.countryData} />
      </section>
    );
  },

});

module.exports = MainSection;
