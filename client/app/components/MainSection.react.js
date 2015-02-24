var React = require('react');
var ReactPropTypes = React.PropTypes;
var DevSearchActions = require('../actions/DevSearchActions');
var Map = require('./Map.react');
var Infobox = require('./Infobox.react');

var MainSection = React.createClass({

  render: function() {
    return (      
      <section id="main">
        <Map countryData={this.props.countryData} />
        <Infobox />
      </section>
    );
  },

});

module.exports = MainSection;
