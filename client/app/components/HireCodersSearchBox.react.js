var React = require('react');
var ProfilesActions = require('../actions/ProfilesActions');

var HireCodersSearchBox = React.createClass({

  render: function() {
    return (
      <form id="search-language-country" ref="form" onSubmit={this.handleSubmit}>
        Programming Language: <input type="text" placeholder="language" ref="language" list="json-datalist" />
        <br /> 
        <br /> 
        Country: <input type="text" placeholder="country" ref="country" /><datalist id="json-datalist"></datalist> 
        <br /> 
        <br /> 
        Category: <input type="text" placeholder="e.g., Web Development" ref="subcategory" />.
        <br /> 
        <br /> 
        Max. Hourly Rate: $ <input type="text" placeholder="Select range" ref="hourlyRateMax"/> /hr. 
        <br /> 
        <br /> 
        <select type="text" placeholder="select feedback score" ref="feedbackScore">      
          <option value="0,5"> Any Feedback Score </option>
          <option value="4.5,5"> 4.5 - 5.0 Stars </option>
          <option value="4,4.5"> 4.0 - 4.5 Stars </option>
          <option value="3,3.9"> 3.0 - 3.9 Stars </option>
          <option value="2,2.9"> 2.0 - 2.9 Stars </option>
          <option value="1,1.9"> 1.0 - 1.9 Stars </option>
        </select>
        <br />
        <br />
        <button type="submit" >SEARCH CODERS</button>
      </form>

    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var language = this.refs.language.getDOMNode().value;
    var country = this.refs.country.getDOMNode().value;
    var subcategory = this.refs.subcategory.getDOMNode().value;
    var hourlyRateMax = this.refs.hourlyRateMax.getDOMNode().value;
    var minScore = this.refs.feedbackScore.getDOMNode().value.split(',')[0];
    var maxScore = this.refs.feedbackScore.getDOMNode().value.split(',')[1];
    
    ProfilesActions.getCoders(language,country,subcategory,hourlyRateMax, minScore, maxScore);
    // this.refs.language.getDOMNode().value = '';
    // this.refs.country.getDOMNode().value = '';
    // this.refs.subcategory.getDOMNode().value = '';
    // this.refs.hourlyRateMax.getDOMNode().value = '';
  }

});

module.exports = HireCodersSearchBox;
