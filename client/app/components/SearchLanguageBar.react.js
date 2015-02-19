var React = require('react');
var ReactPropTypes = React.PropTypes;

var SearchLanguageBar = React.createClass({

    render: function() {
        return (
            <form onSubmit={this.handleSubmit} id={this.props.id}>
                <input type="text" placeholder=" Search language..." />
            </form>
        );
    },

});

module.exports = SearchLanguageBar;