var React = require('react');
//languageColors is the object that maps from a language string to a color hex.
var languageColors = require('./languageColors'); 

var Map = React.createClass({
  callsToRender: 0,

  //Please see wiki page for more detailed information:
  //https://github.com/CulturedCheese/thesis-project/wiki/DataMaps

  // drawMap: function(countryData) {
  //   //TODO: investigate if there's a cleaner way to do this. 
  //   //hacky: right now we're removing the map from the page each time. 
  //   //in d3 i know how to do this, but i'm less sure about this abstraction on top of D3
  //   //we may want to refactor this to use pure D3
  //   document.getElementById('d3Map').innerHTML='';
  //   new Datamap({
  //     element: document.getElementById('d3Map'),
  //     fills: languageColors, //mapping file from language to the color code. it's a long file so we're saving it elsewhere. 
  //     data: countryData,  //this is the data that is attached to each country
  //     geographyConfig: {
  //       popupTemplate: function(geography, data) {
  //         //TODO: we should be able to make this a separate React component
  //         console.log(geography.properties.name);
  //         console.log(data.fillKey);
  //       }
  //     }
  //   });
  // },
  
  drawMap: function(data) {
    
    // this.props.sortedCountriesByLanguageTop10 is a sorted array. The data property on Datamap class is expecting an object argument. 
    // Therefore, we need to parse the array of objects into an object.
    var parsedData = {};
    if (Array.isArray(data)){
      for(var i = 0; i < data.length; i++){
        var countryObj = {};
        countryObj.fillKey = data[i].formattedLanguage;
        countryObj.countryName = data[i].countryName;
        countryObj.activeProgrammers = data[i].activeProgrammers;
        parsedData[data[i].countryCode3] = countryObj; 
      }
    }
    console.log('parsed data:', parsedData);

    document.getElementById('d3Map').innerHTML='';

    var map = new Datamap({
      element: document.getElementById('d3Map'),
      done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              alert(geography.properties.name);
          }); //allows map to be clickable
      },
      fills: languageColors, //mapping file from language to the color code. it's a long file so we're saving it elsewhere. 
      data: parsedData,  //this is the data that is attached to each country
      geographyConfig: {
        popupTemplate: function(geography, data) {
          //TODO: we should be able to make this a separate React component

          return ['<div class="hoverinfo"><strong>',
                  geography.properties.name, ': ', 
                  data.activeProgrammers, " ", 
                  data.fillKey, 
                  " Coders",
                  '</strong></div>'].join('');
        }
      }
    });

    return map;
  },

  componentDidMount: function() {
    this.drawMap(this.props.sortedCountriesByLanguageTop10);
  },

  componentDidUpdate: function() {
    this.drawMap(this.props.sortedCountriesByLanguageTop10);
  },

  render: function() {
    //TODO: style the svg to be the right size. 
    //TODO: give the svg an ID.
    console.log('rendering!')
    return(
      <div id="d3Map" ></div>
    ) 
  }
});

module.exports = Map;
