var React = require('react');

var ProfileBox = React.createClass({

  render: function() {
    return (
      <div className="profile">
        <p>Name: {this.props.profileData.name}</p> 
        <p>Title: {this.props.profileData.title}</p> 
        <p>Categories: {this.props.profileData.subcategories}</p> 
        <p>Skills: {this.props.profileData.skills.join(', ')}</p>
        <p>Feedback: {this.props.profileData.feedback}</p>
        <p>Rate: ${this.props.profileData.hourlyRate}/hr</p>
        <p>Country: {this.props.profileData.country}</p>
        <p>Page: {Number(this.props.profileData.page) + 1}</p>
        <ProfileLink url={this.props.profileData.url} />
        <p>--------------------------------------------------------------</p>
      </div>
    );
  }

});

var ProfileLink = React.createClass({
  render: function() {
    return (
      <a href={this.props.url} target="_blank">
        More details
      </a>
    );
  }
});

module.exports = ProfileBox;