var React = require('react');
var ProfilesActions = require('../actions/ProfilesActions');

var HireCodersSearchBox = React.createClass({

  render: function() {
    return (
      <form id="search-language-country" ref="form" onSubmit={this.handleSubmit}>
        Hire <input type="text" placeholder="language" ref="language" /> coders in <input type="text" placeholder="country" ref="country" />
        <button type="submit" >search coders</button>
      </form>

    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var language = this.refs.language.getDOMNode().value;
    var country = this.refs.country.getDOMNode().value;
    ProfilesActions.getCoders(language,country);
    this.refs.language.getDOMNode().value = '';
    this.refs.country.getDOMNode().value = '';
  }

});

module.exports = HireCodersSearchBox;
