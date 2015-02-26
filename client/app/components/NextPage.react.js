var React = require('react');
// var ProfilesStore = require('../stores/ProfilesStore');

var NextPage = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var req = {}; 
    console.log('clicked!');
    req.page = 1;
    // ProfilesApp.getInitialState(req);
  },

  render: function() {
    return (
    	<form ref="form" onSubmit={this.handleSubmit}>
    	  <button type="submit" >Next Page</button>
    	</form>
    );
  }

});

module.exports = NextPage;
