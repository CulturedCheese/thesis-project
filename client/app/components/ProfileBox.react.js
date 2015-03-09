var React = require('react');

var ProfileBox = React.createClass({

  render: function() {
    var style = {};
    var score = "n/a";
    var starSpan = <span className="glyphicon glyphicon-star" aria-hidden="true"></span>;
    var locationSpan = <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>;
    var portrait = this.props.profileData.portrait; 

    if (this.props.profileData.feedback > 0) {
      score = Math.round( this.props.profileData.feedback * 100) / 100;
    }
    if (!portrait) {
      portrait = "../../images/clients/download.png";
    }
    return (
      <div className="profileThumbnail fadeIn">
          <a href={this.props.profileData.url}>
            <img src={portrait} alt="image not found" className = "profilePortrait" data-src="holder.js/300x200" />
          </a>
          <div className="caption">
            <div className="info">
              <span className="name">{this.props.profileData.name}</span>
              <i className="dot"></i>
              <span className="rate">${this.props.profileData.hourlyRate}/hr</span>
            </div>
            <div className="title">{this.props.profileData.title}</div> 
            <div className="rating-location">
              <p className="rating">{starSpan} {score}</p>
              <p className="location">{locationSpan} {this.props.profileData.country} </p>
            </div>
            <p className="profileDescription">{this.props.profileData.description}</p> 
            <ProfileLink url={this.props.profileData.url} />
          </div>
      </div>
    );
  }

});

var ProfileLink = React.createClass({
  render: function() {
    return (
      <div className="oDeskButton">
        <button>
          <a href={this.props.url} target="_blank">
          oDesk Profile
          </a>
        </button>
      </div>
    );
  }
});

module.exports = ProfileBox;
