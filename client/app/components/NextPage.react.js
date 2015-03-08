var React = require('react');
var ProfilesActions = require('../actions/ProfilesActions');

var NextPage = React.createClass({

  render: function() {
    return (
      <form className="nextPageButton" ref="form" onSubmit={this.handleSubmit}>
        <button type="submit" >NEXT PAGE</button>
      </form>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var currentPage = Number(this.props.profileData[0].page);
    ProfilesActions.nextPage(currentPage + 1);
  }

});

module.exports = NextPage;
