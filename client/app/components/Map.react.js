var React = require('react');
//languageColors is the object that maps from a language string to a color hex.
var languageColors = require('./languageColors'); 
var Infobox = require('./Infobox.react');


//sample data so we can see the format 
// var mockData = {
//   "BRN":{"fillKey":"JavaScript","allLangs":[["JavaScript",3],["Visual Basic",3],["PHP",1]]},
//   "THA":{"fillKey":"JavaScript","allLangs":[["JavaScript",2574],["Python",1108],["PHP",922],["Java",862],["CSS",717],["Ruby",686],["Objective-C",583],["C",356],["Shell",306],["Go",295],["C++",253],["Swift",146],["CoffeeScript",138],["C#",115],["Logos",95],["VimL",85],["Scala",84],["Perl",51],["Clojure",45],["Emacs Lisp",43],["Makefile",36],["Lua",29],["Bison",28],["Puppet",27],["R",26],["TeX",25],["Arduino",18],["Elixir",18],["Common Lisp",16],["Objective-C++",14],["PowerShell",13],["Erlang",11],["Haskell",9],["Haxe",9],["Rust",9],["IDL",8],["XSLT",8],["TypeScript",6],["Frege",5],["Groovy",5],["Vala",5],["Hy",4],["VCL",4],["Assembly",2],["F#",2],["Matlab",2],["Visual Basic",2],["Elm",1],["Nimrod",1],["Racket",1]]},
//   "USA":{"fillKey":"JavaScript","allLangs":[["JavaScript",247330],["Python",91253],["Ruby",89597],["CSS",67692],["Java",56016],["Go",38898],["PHP",35065],["C",33732],["Objective-C",31845],["C++",31777],["Shell",29214],["C#",16234],["CoffeeScript",14271],["VimL",10766],["R",10087],["Swift",9274],["Scala",7916],["Clojure",7344],["Rust",5872],["Perl",5562],["Haskell",5128],["Emacs Lisp",5109],["TeX",3596],["Lua",2766],["Makefile",2453],["Julia",2055],["Erlang",1958],["Groovy",1784],["Bison",1666],["Arduino",1658],["Puppet",1616],["Matlab",1470],["PowerShell",1357],["OCaml",1336],["TypeScript",1293],["Elixir",1232]]}
// };

var Map = React.createClass({
  callsToRender: 0,

  //Please see wiki page for more detailed information:
  //https://github.com/CulturedCheese/thesis-project/wiki/DataMaps

  drawMap: function(countryData) {
    //TODO: investigate if there's a cleaner way to do this. 
    //hacky: right now we're removing the map from the page each time. 
    //in d3 i know how to do this, but i'm less sure about this abstraction on top of D3
    //we may want to refactor this to use pure D3
    document.getElementById('d3Map').innerHTML='';
    new Datamap({
      element: document.getElementById('d3Map'),
      fills: languageColors, //mapping file from language to the color code. it's a long file so we're saving it elsewhere. 
      data: countryData,  //this is the data that is attached to each country
      geographyConfig: {
        popupTemplate: function(geography, data) {
          //TODO: we should be able to make this a separate React component
          console.log(geography.properties.name);
          console.log(data.fillKey);
        }
      }
    });
  },

  componentDidMount: function() {
    this.drawMap(this.props.countryData);
  },

  componentDidUpdate: function() {
    this.drawMap(this.props.countryData);
  },

  render: function() {
    //TODO: style the svg to be the right size. 
    //TODO: give the svg an ID.
    console.log('hello')
    return(
      <section> 
        <div id="d3Map" ></div>
        <Infobox />
      </section>
    ) 
  }
});

module.exports = Map;
