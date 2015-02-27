var React = require('react');
var DevSearchActions = require('../actions/DevSearchActions');
var LanguageSubBox = require('./LanguageSubBox.react');
var CountrySubBox = require('./CountrySubBox.react');

var Infobox = React.createClass({

  render: function() {

  	return (
      <section id="infobox">
      	<LanguageSubBox />
      	<CountrySubBox />      	
      </section>
    );
  },
});

module.exports = Infobox;
