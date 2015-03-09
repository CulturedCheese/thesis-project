var React = require('react');
var DevSearchActions = require('../actions/DevSearchActions');
var LanguageSubBox = require('./LanguageSubBox.react');
var CountrySubBox = require('./CountrySubBox.react');
var InitialSubBox = require('./InitialSubBox.react');

var Infobox = React.createClass({
  
  render: function() {

		var renderedBox;
		if(this.props.workflow === "countryWorkflow"){
			renderedBox = <CountrySubBox countrySpecificData={ this.props.countrySpecificData } />;      	
		} else if(this.props.workflow === "languageWorkflow"){
			renderedBox = <LanguageSubBox sortedCountriesByLanguageTop10={ this.props.sortedCountriesByLanguageTop10 } />;      	
		} else if(this.props.workflow === "initialWorkflow"){
      renderedBox = <InitialSubBox initialWorkflowData={ this.props.initialWorkflowData } />;        
    }

    

  	return (
      <section id="infobox">
        { renderedBox } 
        <button id="hirebutton"><a href="#profilestitle" >Click to find developers</a></button>
      </section>
    );
  },
});

module.exports = Infobox;
