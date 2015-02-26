var React = require('react');

var ProfileBox = React.createClass({

  render: function() {
    return (
      <div className="profile">
        <p>Name: {this.props.profileData.name}</p> 
        <p>Title: {this.props.profileData.title}</p> 
        <p>Skills: {this.props.profileData.skills.join(', ')}</p>
        <p>Feedback: {this.props.profileData.feedback}</p>
        <p>Rate: ${this.props.profileData.hourlyRate}/hr</p>
        <p>Country: {this.props.profileData.country}</p>
        <ProfileLink url={this.props.profileData.url} />
        <p>--------------------------------------------------------------</p>
      </div>
    );
  },

});

var ProfileLink = React.createClass({
  render: function() {
    return (
      <a href={this.props.url}>
        More details
      </a>
    );
  }
});

module.exports = ProfileBox;