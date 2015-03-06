var DevSearchActions = require('../actions/DevSearchActions');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchLanguageBar = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var input = this.refs.text.getDOMNode().value;
    var workflow = this.props.workflow;
    DevSearchActions.displayData(input, workflow);
    this.refs.text.getDOMNode().value = '';
  },

  render: function() {
    var countryList = document.getElementById('json-countrylist');
    var languageList = document.getElementById('json-languagelist');
    var autocompleteScript = document.getElementById('autocomplete');
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');

    var reloadJs = function(src) {
      if (autocompleteScript){
        autocompleteScript.remove();
      }
      if (countryList){
        countryList.remove();
      }
      script.src = src;
      script.id = "autocomplete";
      body.appendChild(script);
    };

    if (!languageList){
      reloadJs('./autocomplete.js');
    }

    return (
      <form id="searchbar" onSubmit={this.handleSubmit} >
        <input type="text" id="ajax" placeholder="  Search" list="json-languagelist" ref="text"/>
        <input id="submitbutton2" type="submit" value="Submit" />
        <datalist id="json-languagelist" ></datalist>
      </form>
    );
  }
});

module.exports = SearchLanguageBar;
