var React = require('react');

var ProfileBox = React.createClass({

  render: function() {
    var style = {};

    return (
      <div className="profileThumbnail">
          <a href={this.props.profileData.url}>
            <img className = "profilePortrait" data-src="holder.js/300x200" alt="300x200" src={this.props.profileData.portrait} />
          </a>
          <div className="caption">
            <div className="info">
              <span className="name">{this.props.profileData.name}</span>
              <i className="dot"></i>
              <span className="rate">${this.props.profileData.hourlyRate}/hr</span>
            </div>
            <div className="title">{this.props.profileData.title}</div> 
            <div className="rating-location">
              <p>oDesk Score: {Math.round( this.props.profileData.feedback * 10) / 10}</p>
              <p>Country: {this.props.profileData.country}</p>
            </div>
            <p>Skills: {this.props.profileData.skills.join(', ')}</p>
            <p className="profileDescription">{this.props.profileData.description}</p>
            <p>Page: {Number(this.props.profileData.page) + 1}</p>
            <ProfileLink url={this.props.profileData.url} />
          </div>
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
