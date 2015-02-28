var React = require('react');
var ProfileBox = require('./ProfileBox.react');
var HireCodersSearchBox = require('./HireCodersSearchBox.react');
var NextPage = require('./NextPage.react');

var Profiles = React.createClass({

  render: function() {
  	var results = this.props.profileData;
	    return (
	      <section id="profiles">
          <HireCodersSearchBox />
          <NextPage profileData={results} />
          <br />
          <br />
          {results.map(function(result) {
          	return <ProfileBox profileData={result} />;
          })}
	      </section>
	    );
  }

});

module.exports = Profiles;
