var React = require('react');
var ProfilesActions = require('../actions/ProfilesActions');

var HireCodersSearchBox = React.createClass({

render: function() {
    return (
      <form className="developers-search" ref="form" onSubmit={this.handleSubmit}>
        <h2> Find Developers </h2>
        <h3> What are you looking for? </h3>
        <input className="programmersearch" type="text" placeholder="  Enter a language..." ref="language" list="json-datalist" /><br />
        <input className="programmersearch" type="text" placeholder="  Enter a country..." ref="country" /><datalist id="json-datalist"></datalist><br />
        <input className="programmersearch" type="text" placeholder="  Enter a max hourly rate in USD..." ref="hourlyRateMax"/><br />
        <select className="ratingdropdown" type="text" placeholder="Select score" ref="feedbackScore">      
          <option value="0,5"> Any feedback score </option>
          <option value="4.5,5"> 4.5 - 5.0 Stars </option>
          <option value="4,4.5"> 4.0 - 4.5 Stars </option>
          <option value="3,3.9"> 3.0 - 3.9 Stars </option>
          <option value="2,2.9"> 2.0 - 2.9 Stars </option>
          <option value="1,1.9"> 1.0 - 1.9 Stars </option>
        </select>
        <button className="hireDevsButton" type="submit" >Search</button>
      </form>

    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var language = this.refs.language.getDOMNode().value;
    var country = this.refs.country.getDOMNode().value;
    var hourlyRateMax = this.refs.hourlyRateMax.getDOMNode().value;
    var minScore = this.refs.feedbackScore.getDOMNode().value.split(',')[0];
    var maxScore = this.refs.feedbackScore.getDOMNode().value.split(',')[1];
    
    ProfilesActions.getCoders(language,country,hourlyRateMax, minScore, maxScore);
    // this.refs.language.getDOMNode().value = '';
    // this.refs.country.getDOMNode().value = '';
    // this.refs.subcategory.getDOMNode().value = '';
    // this.refs.hourlyRateMax.getDOMNode().value = '';
  }

});

module.exports = HireCodersSearchBox;
