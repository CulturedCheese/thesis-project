var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchLanguageBar = React.createClass({

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} id="search-language" >
          <input type="text" placeholder=" Search by language..." />
      </form>
    );
  },
});

module.exports = SearchLanguageBar;
