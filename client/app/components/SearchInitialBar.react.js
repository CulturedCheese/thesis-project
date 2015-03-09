var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchInitialBar = React.createClass({

  render: function() {
    return (
      <form id="searchbar" onSubmit={this.handleSubmit} >
        <input type="text" id="ajax2" placeholder="  Search..." ref="text"/>
        <input id="submitbutton3" type="submit" value="Submit" />
      </form>
    );
  }

});

module.exports = SearchInitialBar;
