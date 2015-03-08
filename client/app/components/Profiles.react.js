var React = require('react');
var ProfileBox = require('./ProfileBox.react');
var HireCodersSearchBox = require('./HireCodersSearchBox.react');
var NextPage = require('./NextPage.react');

var Profiles = React.createClass({

  render: function() {
  	var results = this.props.profileData;
	    return (
	      <section className="profiles">
          <HireCodersSearchBox />
          <div className="profileBoxes">
            {results.map(function(result) {
              return <ProfileBox profileData={result} />;
            })}
          </div>
          <NextPage profileData={results} />
	      </section>
	    );
  }

});

module.exports = Profiles;
