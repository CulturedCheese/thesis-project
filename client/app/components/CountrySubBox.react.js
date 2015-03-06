var React = require('react');

var CountrySubBox = React.createClass({

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render: function() {
    var result = this.props.countrySpecificData;   
    return (
      <div className="countrysubbox">
        <h2>Country: { result.countryName }</h2>
        <p>YoY # Dev Growth: { result.growthRate }% </p>
        <p>Avg. Dev Hourly Wage: ${ result.hourlyWage }/hr </p>
        <h5><u>Most Popular Languages: (# of devs)</u></h5> 
        <ol class="countryresults">
          <li> { result["topLangs"][0] } ({ result["numDevs"][0] })  </li>
          <li> { result["topLangs"][1] } ({ result["numDevs"][1] })  </li>
          <li> { result["topLangs"][2] } ({ result["numDevs"][2] })  </li>
          <li> { result["topLangs"][3] } ({ result["numDevs"][3] })  </li>
          <li> { result["topLangs"][4] } ({ result["numDevs"][4] })  </li>
          <li> { result["topLangs"][5] } ({ result["numDevs"][5] })  </li>
          <li> { result["topLangs"][6] } ({ result["numDevs"][6] })  </li>
          <li> { result["topLangs"][7] } ({ result["numDevs"][7] })  </li>
          <li> { result["topLangs"][8] } ({ result["numDevs"][8] })  </li>
          <li> { result["topLangs"][9] } ({ result["numDevs"][9] })  </li>
        </ol>
      </div>
    );
  }
});

module.exports = CountrySubBox;