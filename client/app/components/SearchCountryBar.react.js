var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchCountryBar = React.createClass({

	getInitialState: function() {
    return {country: '' };
    console.log(this.props.country);
  },

	handleSubmit: function(search_param){
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   type: 'POST',
    //   data: search_param,
    //   success: function(data){
    //       this.setState({data:data});
    //       console.log(data);
    //   }.bind(this),
    //   error: function (xhr, status, err) {
    //       console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },

  render: function() {
	  return (
	    <form onSubmit={this.handleSubmit} id="search-country">
	      <input type="text" placeholder=" Search by country..." />
	    </form>
	  );
  },

});

module.exports = SearchCountryBar;


 
