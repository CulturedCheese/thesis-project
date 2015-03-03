var express = require('express');
var apiRouter = express.Router();
var oDeskApi = require('odesk-api'), rl = require('readline');
var Q = require('q'); 
var url = require('url');
var databaseLogic = require('./databaseLogic.js');

//TODO: refactor this into the config file.
// configures oDesk api to enable HTTP requets
// TODO: we're also requiring and then immediately overwriting our config. is that what we want?!
var config = require('./../../../config.js');
var config = {
  consumerKey : config.odeskAPI,
  consumerSecret : config.odeskSECRET,
  accessToken : config.odeskAccessToken,
  accessSecret : config.odeskAccessSecret,
  debug : false
};
var api = new oDeskApi(config);

// controllers
var databaseLogic = require('./databaseLogic.js');
var freelancersLogic = require('./freelancersLogic.js');

// api routes for Github data
apiRouter.get('/allCountriesAllLanguages', function(req,res) {
  console.log('heard a request to allCountriesAllLanguages');
  databaseLogic.allCountriesAllLanguages(req,res);
});

apiRouter.get('/countriesForLanguage', function(req,res) {
  console.log('heard a request to countriesForLanguage');
  databaseLogic.countriesForLanguage(req,res);
});

apiRouter.get('/developerCountByCountry', function(req,res) {
  console.log('heard a request to developerCountByCountry');
  databaseLogic.developerCountByCountry(req,res);
});

apiRouter.get('/developerCountByLanguage', function(req,res) {
  console.log('heard a request to developerCountByLanguage');
  databaseLogic.developerCountByLanguage(req,res);
});

//TODO: cleanup. 
// when user selects a language, a list of top 10 countries for that language is returned
apiRouter.get('/CountryCountByLanguage', function(req,res) {
  console.log('heard a request to CountryCountByLanguage');
  var language = req.language || 'JavaScript';
  // get allCountriesAllLanguages from sql database, return the following 
  var countryData = {"BRN":{"2013":1,"2014":3,"fillKey":"Python","allLangs":[["Python",2],["CSS",1],["JavaScript",1],["Shell",1]],"countryCode3":"BRN","countryCode2":"BN","countryName":"Brunei Darussalam"},
  "THA":{"2013":302,"2014":584,"fillKey":"JavaScript","allLangs":[["JavaScript",250],["CSS",128],["PHP",120],["Java",118],["Python",111],["Ruby",87],["C",66],["Objective-C",56],["C++",55],["Shell",53],["Go",35],["C#",32],["CoffeeScript",32],["VimL",28],["Swift",21],["OCaml",13],["Perl",11],["Arduino",10],["Emacs Lisp",6],["Visual Basic",6],["Elixir",5],["R",5],["Scala",5],["TeX",5],["AppleScript",4],["Clojure",4],["Lua",4],["Makefile",4],["Puppet",4],["Common Lisp",3],["Erlang",3],["Haskell",3],["ActionScript",2],["Assembly",2],["Dart",2],["Objective-C++",2],["PowerShell",2],["Prolog",2],["Rust",2],["AutoIt",1],["Crystal",1],["Frege",1],["Groovy",1],["Haxe",1],["Julia",1],["LiveScript",1],["Logos",1],["Matlab",1],["Nimrod",1],["Pascal",1],["Processing",1],["Squirrel",1],["TypeScript",1],["Vala",1],["XSLT",1]],"countryCode3":"THA","countryCode2":"TH","countryName":"Thailand"},
  "USA":{"2013":47736,"2014":74250,"fillKey":"JavaScript","allLangs":[["JavaScript",29335],["CSS",15776],["Python",15359],["Ruby",12699],["Java",10682],["C++",7139],["Shell",7096],["C",7074],["PHP",6999],["Objective-C",4867],["C#",4015],["Go",3912],["CoffeeScript",2831],["VimL",2712],["R",1544],["Swift",1491],["Scala",1468],["Perl",1380],["TeX",1045],["Clojure",1025],["Emacs Lisp",997],["Ruby",864],["OCaml",829],["Haskell",730],["Python",695],["CSS",662],["Rust",571],["Lua",539],["Groovy",443],["Matlab",418],["Puppet",410],["Arduino",409],["PowerShell",393],["Java",381],["TypeScript",380],["Shell",378],["Objective-C",377],["Go",342],["Erlang",310],["Elixir",297],["C",281],["Assembly",259],["XSLT",253],["C++",247],["Visual Basic",229],["CoffeeScript",205],["Julia",203],["Processing",203],["PHP",194],["Makefile",192],["Scheme",172],["VimL",170],["ActionScript",150],["Swift",141],["FORTRAN",131],["Common Lisp",130],["D",118],["Haxe",116],["Racket",115],["Prolog",110],["F#",108],["Dart",106],["Scala",105],["AppleScript",101],["Objective-C++",95],["AGS Script",83],["ASP",82],["C#",80],["OCaml",69],["Verilog",68],["Nix",58],["Crystal",57],["Cuda",57],["Clojure",56],["Perl",56],["ColdFusion",54],["Apex",48],["OpenSCAD",48],["OpenEdge ABL",47],["Pascal",44],["Vala",44],["IDL",43],["Emacs Lisp",41],["LiveScript",41],["Rust",40],["Max",39],["PureScript",38],["Tcl",38],["VHDL",38],["Kotlin",35],["Elm",33],["Mathematica",33],["Gosu",32],["Logos",32],["Standard ML",31],["SQF",30],["Haskell",30],["Coq",29],["Game Maker Language",27],["R",26],["Erlang",25],["AutoHotkey",24],["Lua",23],["Nemerle",23],["Groovy",22],["Awk",20],["XQuery",20],["SAS",19],["Squirrel",19],["M",19],["Puppet",18],["Nimrod",18],["Pure Data",17],["nesC",16],["Stata",16],["VCL",16],["SQL",15],["TeX",15],["TypeScript",15],["Propeller Spin",15],["Elixir",14],["GAP",14],["SourcePawn",14],["Thrift",14],["Arduino",13],["BlitzBasic",13],["LabVIEW",13],["Perl6",13],["Frege",12],["Gnuplot",12],["J",12],["Mercury",12],["Objective-C++",11],["Processing",11],["Red",11],["SuperCollider",11],["Julia",10],["Objective-J",10],["AGS Script",9],["XSLT",9],["Agda",9],["DM",9],["DOT",9],["MoonScript",9],["NetLogo",9],["SystemVerilog",9],["Matlab",8],["Ada",8],["ANTLR",8],["Eiffel",8],["Io",8],["ActionScript",7],["AppleScript",7],["Assembly",7],["Arc",7],["Elm",6],["Thrift",6],["AutoIt",6],["Bluespec",6],["Delphi",6],["Factor",6],["REALbasic",6],["wisp",6],["Rebol",5],["UnrealScript",5],["Common Lisp",5],["Haxe",5],["Makefile",5],["Brightscript",5],["Bro",5],["COBOL",5],["Hack",5],["Lasso",5],["Apex",4],["F#",4],["PowerShell",4],["Prolog",4],["Visual Basic",4],["AspectJ",4],["ATS",4],["Boo",4],["Inform 7",4],["Smalltalk",4],["Scilab",3],["Slash",3],["Crystal",3],["LiveScript",3],["PureScript",3],["Scheme",3],["Augeas",3],["Cycript",3],["Fantom",3],["Grammatical Framework",3],["Idris",3],["LSL",3],["ColdFusion",2],["D",2],["Dart",2],["Gosu",2],["IDL",2],["Logos",2],["M",2],["Mercury",2],["Nix",2],["OpenEdge ABL",2],["Racket",2],["Red",2],["Standard ML",2],["Vala",2],["Bison",2],["Dylan",2],["Forth",2],["Glyph",2],["Hy",2],["JSONiq",2],["Papyrus",2],["Ragel in Ruby Host",2],["Self",1],["Turing",1],["XC",1],["XML",1],["Xojo",1],["XProc",1],["Xtend",1],["Zephir",1],["ABAP",1],["Arc",1],["AutoHotkey",1],["AutoIt",1],["Dylan",1],["Factor",1],["FORTRAN",1],["Idris",1],["MoonScript",1],["nesC",1],["Nimrod",1],["Opal",1],["Scilab",1],["SQL",1],["Tcl",1],["APL",1],["Ceylon",1],["Chapel",1],["CLIPS",1],["Ecl",1],["EmberScript",1],["Fancy",1],["GAMS",1],["GDScript",1],["Grace",1],["Harbour",1],["Isabelle",1],["KRL",1],["Logtalk",1],["LOLCODE",1],["LookML",1],["Mirah",1],["Monkey",1],["Nu",1],["ooc",1],["Parrot",1],["PAWN",1],["PigLatin",1],["PogoScript",1]],"countryCode3":"USA","countryCode2":"US","countryName":"United States"}
  };
  var countryLanguageCount = {};
  // iterate through countryData object
  for(var country in countryData) {
    // grab languages data for each country
    for (var i = 0; i < countryData[country].allLangs.length; i++) {
      if(countryData[country].allLangs[i][0] === language) {
        countryLanguageCount[countryData[country].countryCode3] = countryData[country].allLangs[i].concat();
      }
    }    
  }
  console.log(countryLanguageCount);
  // from countryLanguageCount, select the top 10 countries by # of active developers 
  
});

//TODO: refactor to go into a separate Logic file, rather than in the routing file
// api route for oDesk data
// routes to the odesk API-based profile listing given country and language
// TODO: move to freelancersLogic.js
apiRouter.get('/codersNextPage', function(req, res) {
  api.setAccessToken(config.accessToken, config.accessSecret, function() {
    var Search = require('odesk-api/lib/routers/freelancers/search.js').Search;
    var freelancers = new Search(api);
    var page = req.url.split("=")[1] || 0;
    var language = req.url.split("=")[3];  
    var country = req.url.split("=")[5]; 
    var subcategory = req.url.split("=")[7] || 'Web Development'; 
    // queries the top 20 results; at least 4.0 feedback score
    var params = {'q': 'skills:'+ language + ' AND country:' + country + ' AND subcategory2:' + subcategory, 'paging': page + ';20', 'feedback': '[1 TO 5]'}
    var profiles = Q.nbind(freelancers.find,freelancers);
    profiles(params)
      .then(function (results) {
        var profiles = results.providers; // an array containing a list of 20 freelancer profiles
        // parse profiles to grab only the name, title, skills, feedback, portrait, id from each profile  
        var summaryProfiles = profiles.map(function(profile){
          return {
            name: profile.name,
            title: profile.title,
            subcategories: profile.categories,
            skills: profile.skills,
            feedback: profile.feedback,
            portrait: profile.portrait_50,
            country: profile.country,
            hourlyRate: profile.rate,
            page: page,
            url: 'https://www.odesk.com/o/profiles/users/_' + profile.id
          };
        });
        res.send(summaryProfiles);
      })
  });
});

//TODO: refactor to go into a dedicated logic file, rather than in the routing file like it is now
apiRouter.get('/coders', function(req, res) {
  api.setAccessToken(config.accessToken, config.accessSecret, function() {
    console.log("server hears a call for /coders")
    var Search = require('odesk-api/lib/routers/freelancers/search.js').Search;
    var freelancers = new Search(api);
    var page = req.url.split("=")[1] || 0;
    var language = req.url.split("=")[3] || 'JavaScript'; 
    var country = req.url.split("=")[5] || 'Vietnam'; 
    var subcategory = req.url.split("=")[7] || 'Web Development'; 
    var hourlyRate = req.url.split("=")[9] || '100'; 
    var minScore = req.url.split('=')[11] || 0;
    var maxScore = req.url.split('=')[13] || 5;

    var summaryProfiles = {};
    // queries the top 20 results; at least 4.0 feedback score
    var params = {'q': 'skills:'+ language + ' AND country:' + country + ' AND subcategory2:' + subcategory, 'rate': '[0 TO ' + hourlyRate+ ']', 'paging': page + ';20', 'feedback': '[' + minScore + ' TO ' + maxScore + ']'};

    console.log(language, country, subcategory, hourlyRate, minScore, maxScore, params);
    var profiles = Q.nbind(freelancers.find,freelancers);
    
    profiles(params)
      .then(function (results) {
        var profiles = results.providers; // an array containing a list of 20 freelancer profiles
        // parse profiles to grab only the name, title, skills, feedback, portrait, id from each profile  
        var summaryProfiles = profiles.map(function(profile){
          return {
            name: profile.name,
            title: profile.title,
            subcategories: profile.categories,
            skills: profile.skills,
            feedback: profile.feedback,
            portrait: profile.portrait_50,
            country: profile.country,
            hourlyRate: profile.rate,
            page: page,
            url: 'https://www.odesk.com/o/profiles/users/_' + profile.id
          };
        });
        res.send(summaryProfiles);
      })
  });
});

module.exports = apiRouter;
