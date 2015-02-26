var React = require('react');
var ProfileBox = require('./ProfileBox.react');
var NextPage = require('./NextPage.react');

var Profiles = React.createClass({

  render: function() {
  	var results = this.props.profileData;
	    return (
	      <section id="profiles">
          <NextPage />
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
