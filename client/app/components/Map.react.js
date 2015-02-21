var React = require('react');
//languageColors is the object that maps from a language string to a color hex.
var languageColors = require('./languageColors'); 

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

  render: function() {
    console.log('call to render' + this.callsToRender++);
    //right now this isn't updating because we're not returning it from render
    //TODO: either wipe out the whole map and re-render it each time,
    //TODO: or find a way to return it in react.
    return(
      new Datamap({
        element: document.getElementById('d3Map'),
        fills: languageColors, //mapping file from language to the color code. it's a long file so we're saving it elsewhere. 
        data: this.props.countryData,  //this is the data that is attached to each country
        geographyConfig: {
          popupTemplate: function(geo, data) {
            //TODO: format this. right now it's just putting the whole 'data.allLangs' object into the hover
            //clearly we want to have this formatted more intelligently
            //we should be able to make this a separate React component
            return ['<div class="hoverinfo"><strong>',
                    'Number of things in ' + geo.properties.name,
                    ': ' + data.allLangs,
                    '</strong></div>'].join('')
          }
        }
      })
    ) 

  },


});

//original render function
// render: function() {
//   console.log('call to render' + this.callsToRender++);
//   //right now this isn't updating because we're not returning it from render
//   //TODO: either wipe out the whole map and re-render it each time,
//   //TODO: or find a way to return it in react.
//   var map = new Datamap({
//     element: document.getElementById('d3Map'),
//     fills: languageColors, //mapping file from language to the color code. it's a long file so we're saving it elsewhere. 
//     data: this.props.countryData,  //this is the data that is attached to each country
//     geographyConfig: {
//       popupTemplate: function(geo, data) {
//         //TODO: format this. right now it's just putting the whole 'data.allLangs' object into the hover
//         //clearly we want to have this formatted more intelligently
//         //we should be able to make this a separate React component
//         return ['<div class="hoverinfo"><strong>',
//                 'Number of things in ' + geo.properties.name,
//                 ': ' + data.allLangs,
//                 '</strong></div>'].join('');
//       }
//     }
//     //ideally we can set responsive to true and it will adjust based on the screen size
//     // responsive: true
//   });

//   return (
//     <span></span>
//   );
// },


module.exports = Map;
