var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchCountryBar = React.createClass({

    render: function() {
        return (
            <form onSubmit={this.handleSubmit} id={this.props.id}>
                <input type="text" placeholder=" Search country..." />
            </form>
        );
    },

});

module.exports = SearchCountryBar;