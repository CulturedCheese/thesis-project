var React = require('react');

var InitialSubBox = React.createClass({

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render: function() {
    var result = this.props.initialWorkflowData;   
    return (
      <div className="initialsubbox">
        <h1>MOST POPULAR</h1> 
        <h1>LANGUAGES: WORLD</h1>
        <h2>(# Developers)</h2> 
        <ol class="initialresults">
          <li class="initialresults"> { result["topTenLangs"][0][0] } ({ result["topTenLangs"][0][1] })  </li>
          <li> { result["topTenLangs"][1][0] } ({ result["topTenLangs"][1][1] })  </li>
          <li> { result["topTenLangs"][2][0] } ({ result["topTenLangs"][2][1] })  </li>
          <li> { result["topTenLangs"][3][0] } ({ result["topTenLangs"][3][1] })  </li>
          <li> { result["topTenLangs"][4][0] } ({ result["topTenLangs"][4][1] })  </li>
          <li> { result["topTenLangs"][5][0] } ({ result["topTenLangs"][5][1] })  </li>
          <li> { result["topTenLangs"][6][0] } ({ result["topTenLangs"][6][1] })  </li>
          <li> { result["topTenLangs"][7][0] } ({ result["topTenLangs"][7][1] })  </li>
          <li> { result["topTenLangs"][8][0] } ({ result["topTenLangs"][8][1] })  </li>                   
          <li> { result["topTenLangs"][9][0] } ({ result["topTenLangs"][9][1] })  </li>
        </ol>
      </div>
    );
  }
});

module.exports = InitialSubBox;