var React = require('react');
var DevSearchActions = require('../actions/DevSearchActions');

var LanguageSubBoxNextPage = React.createClass({

  render: function() {
    return (
      <form ref="form" onSubmit={this._handleSubmit}>
        <button type="submit" >Next Page</button>
      </form>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    //TODO: write code
  }

});

module.exports = LanguageSubBoxNextPage;
