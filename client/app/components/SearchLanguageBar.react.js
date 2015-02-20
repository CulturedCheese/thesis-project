var React = require('react');

var SearchLanguageBar = React.createClass({
  // handleSubmit: function() {
  //   return (

  //   )
  // },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} id={this.props.id}>
          <input type="text" placeholder=" Search language..." />
      </form>
    );
  },
});

module.exports = SearchLanguageBar;
