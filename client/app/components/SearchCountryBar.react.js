var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchCountryBar = React.createClass({

    render: function() {
        return (
            <form onSubmit={this.handleSubmit} id="search-country">
                <input type="text" placeholder=" Search by country..." />
            </form>
        );
    },

});

module.exports = SearchCountryBar;


 
