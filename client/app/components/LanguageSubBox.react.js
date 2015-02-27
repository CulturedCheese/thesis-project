var React = require('react');

var LanguageSubBox = React.createClass({

  render: function() {
    return (
      <div className="languagesubbox">
        <h3>Language Search Results</h3>
        <p>Language</p> 
        <p># of Active Developers</p> 
        <p>Top 5 GitHub Handles</p>
        <p></p>
        <p></p>
        <p></p>
        <p>--------------------------------------------------------------</p>
      </div>
    );
  },

});

module.exports = LanguageSubBox;