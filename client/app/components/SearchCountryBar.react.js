var DevSearchActions = require('../actions/DevSearchActions');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchCountryBar = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var input = this.refs.text.getDOMNode().value;
    var workflow = this.props.workflow;
    DevSearchActions.displayData(input, workflow);
    this.refs.text.getDOMNode().value = '';
  },

  render: function() {
    var reloadJs = function(src) {
      var body = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      if (document.getElementById('autocomplete')){
        document.getElementById('autocomplete').remove();
      }
      script.src = src;
      script.id = "autocomplete";
      body.appendChild(script);
    };

    reloadJs('./autocomplete.js');

    return (
      <form id="searchbar" onSubmit={this.handleSubmit} >
        <input type="text" id="ajax2" placeholder="  Search" list="json-countrylist" ref="text"/>
        <input id="submitbutton" type="submit" value="Submit" />
        <datalist id="json-countrylist"></datalist>  
      </form>
    );
  }

});

module.exports = SearchCountryBar;
