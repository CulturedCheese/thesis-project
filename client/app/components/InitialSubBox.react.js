var React = require('react');

var InitialSubBox = React.createClass({

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render: function() {
    var result = this.props.initialWorkflowData;   
    return (
      <div className="initialsubbox">
        <h1><b>Most Popular</b></h1> 
        <h1><b>Languages: World</b></h1>
        <h2>(# Developers)</h2> 
        <div class="initialresults">
          <div> 1.  { result["topTenLangs"][0][0] }:  ({ result["topTenLangs"][0][1] })  </div>
          <div> 2.  { result["topTenLangs"][1][0] }: ({ result["topTenLangs"][1][1] }) </div>
          <div> 3.  { result["topTenLangs"][2][0] }: ({ result["topTenLangs"][2][1] }) </div>
          <div> 4.  { result["topTenLangs"][3][0] }: ({ result["topTenLangs"][3][1] }) </div>
          <div> 5.  { result["topTenLangs"][4][0] }: ({ result["topTenLangs"][4][1] }) </div>
          <div> 6.  { result["topTenLangs"][5][0] }: ({ result["topTenLangs"][5][1] }) </div>
          <div> 7.  { result["topTenLangs"][6][0] }: ({ result["topTenLangs"][6][1] }) </div>
          <div> 8.  { result["topTenLangs"][7][0] }: ({ result["topTenLangs"][7][1] }) </div>
          <div> 9.  { result["topTenLangs"][8][0] }: ({ result["topTenLangs"][8][1] }) </div>                   
          <div> 10. { result["topTenLangs"][9][0] }: ({ result["topTenLangs"][9][1] }) </div>
        </div>
      </div>
    );
  }
});

module.exports = InitialSubBox;