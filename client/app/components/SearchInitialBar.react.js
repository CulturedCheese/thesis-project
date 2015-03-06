var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchInitialBar = React.createClass({

  render: function() {
    return (
      <form id="searchbar" onSubmit={this.handleSubmit} >
        <input type="text" id="ajax2" list="json-countrylist" placeholder="  Search" ref="text"/>
        <input id="submitbutton3" type="submit" value="Submit" />
        <datalist id="json-countrylist"></datalist>  
      </form>
    );
  }

});

module.exports = SearchInitialBar;
