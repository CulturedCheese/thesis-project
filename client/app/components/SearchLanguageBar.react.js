var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchLanguageBar = React.createClass({
	
	getInitialState: function() {
    return {language: '' };
    console.log(this.props.language);
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
      <form onSubmit={this.handleSubmit} id="search-language" >
          <input type="text" placeholder=" Search by language..." />
      </form>
    );
  },
});

module.exports = SearchLanguageBar;
