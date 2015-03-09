var React = require('react');

var CountrySubBox = React.createClass({

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render: function() {
    var result = this.props.countrySpecificData;   
    return (
      <div className="countrysubbox">
        <h1><b>Country: </b></h1>
        <h1 id="dynamicresult"><b> { result.countryName } </b></h1>
        <h2>Most Popular Languages</h2> 
        <div class="countryresults">
          <div> 1. { result["topLangs"][0] }: ({ result["numDevs"][0] })  </div>
          <div> 2. { result["topLangs"][1] }: ({ result["numDevs"][1] })  </div>
          <div> 3. { result["topLangs"][2] }: ({ result["numDevs"][2] })  </div>
          <div> 4. { result["topLangs"][3] }: ({ result["numDevs"][3] })  </div>
          <div> 5. { result["topLangs"][4] }: ({ result["numDevs"][4] })  </div>
          <div> 6. { result["topLangs"][5] }: ({ result["numDevs"][5] })  </div>
          <div> 7. { result["topLangs"][6] }: ({ result["numDevs"][6] })  </div>
          <div> 8. { result["topLangs"][7] }: ({ result["numDevs"][7] })  </div>
          <div> 9. { result["topLangs"][8] }: ({ result["numDevs"][8] })  </div>
          <div> 10. { result["topLangs"][9] }: ({ result["numDevs"][9] })  </div>
        </div>
        <h3 id="yearlygrowth"><b>YoY Growth: { result.growthRate }%</b></h3>
        <h3><b>Avg. Hourly Wage: ${ result.hourlyWage }/hr</b></h3>
      </div>
    );
  }
});

module.exports = CountrySubBox;