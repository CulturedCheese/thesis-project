var React = require('react');
var ProfilesActions = require('../actions/ProfilesActions');

var NextPage = React.createClass({

  render: function() {
    return (
      <form ref="form" onSubmit={this._handleSubmit}>
        <button type="submit" >Next Page</button>
      </form>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    var currentPage = Number(this.props.profileData[0].page);
    ProfilesActions.nextPage(currentPage + 1);
  }

});

module.exports = NextPage;
