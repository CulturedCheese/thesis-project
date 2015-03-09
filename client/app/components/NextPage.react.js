var React = require('react');
var ProfilesActions = require('../actions/ProfilesActions');

var NextPage = React.createClass({
  
  render: function() {
    return (
      <form ref="form" onSubmit={this.handleSubmit}>
        <button className="nextPageButton" type="submit" >Next</button>
      </form>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var currentPage = Number(this.props.profileData[0].page);
    ProfilesActions.nextPage(currentPage + 8);
  }

});

module.exports = NextPage;
