var db = require('../db');
var http = require('http');
var githubToMysqlMap = require('./githubToMysqlMap');
var mysqlToGithubMap = require('./mysqlToGithubMap');

module.exports = {
  insertCountryToDb: function(req, res) {
      //TODO: refactor from 'countryHashTest' to use the country Object
    var countryHashTest = {
      US: {
        users: 10,
        languages: {
          javascript: 8,
          python: 4,
          Ruby: 0
        }
      }, 
      DE: {
        users: 7,
        languages: {
          javascript: 4,
          C: 3
        }
      }
    };

    for(var key in countryHashTest) {
      var countryObj = countryHashTest[key];
      var languages = countryObj.languages;
      var countryCode = key;
      var userCount = countryObj.users;
      //If the country has a value for that language, use that value!
      //If not, set that language equal to 0
      var Csharp = languages[mysqlToGithubMap['Csharp']] || 0;
      var Prolog = languages[mysqlToGithubMap['Prolog']] || 0;
      var C = languages[mysqlToGithubMap['C']] || 0;
      var Python = languages[mysqlToGithubMap['Python']] || 0;
      var Objective_C = languages[mysqlToGithubMap['Objective_C']] || 0;
      var CSS = languages[mysqlToGithubMap['CSS']] || 0;
      var JavaScript = languages[mysqlToGithubMap['JavaScript']] || 0;
      var TeX = languages[mysqlToGithubMap['TeX']] || 0;
      var PHP = languages[mysqlToGithubMap['PHP']] || 0;
      var Java = languages[mysqlToGithubMap['Java']] || 0;
      var FORTRAN = languages[mysqlToGithubMap['FORTRAN']] || 0;
      var Go = languages[mysqlToGithubMap['Go']] || 0;
      var Cplusplus = languages[mysqlToGithubMap['Cplusplus']] || 0;
      var Swift = languages[mysqlToGithubMap['Swift']] || 0;
      var Ruby = languages[mysqlToGithubMap['Ruby']] || 0;
      var VimL = languages[mysqlToGithubMap['VimL']] || 0;
      var Lua = languages[mysqlToGithubMap['Lua']] || 0;
      var Emacs_Lisp = languages[mysqlToGithubMap['Emacs_Lisp']] || 0;
      var OCaml = languages[mysqlToGithubMap['OCaml']] || 0;
      var R = languages[mysqlToGithubMap['R']] || 0;
      var Propeller_Spin = languages[mysqlToGithubMap['Propeller_Spin']] || 0;
      var Shell = languages[mysqlToGithubMap['Shell']] || 0;
      var Arduino = languages[mysqlToGithubMap['Arduino']] || 0;
      var Pascal = languages[mysqlToGithubMap['Pascal']] || 0;
      var DM = languages[mysqlToGithubMap['DM']] || 0;
      var Scala = languages[mysqlToGithubMap['Scala']] || 0;
      var ASP = languages[mysqlToGithubMap['ASP']] || 0;
      var Visual_Basic = languages[mysqlToGithubMap['Visual_Basic']] || 0;
      var Assembly = languages[mysqlToGithubMap['Assembly']] || 0;
      var Perl = languages[mysqlToGithubMap['Perl']] || 0;
      var CoffeeScript = languages[mysqlToGithubMap['CoffeeScript']] || 0;
      var Clojure = languages[mysqlToGithubMap['Clojure']] || 0;
      var Makefile = languages[mysqlToGithubMap['Makefile']] || 0;
      var Rust = languages[mysqlToGithubMap['Rust']] || 0;
      var Racket = languages[mysqlToGithubMap['Racket']] || 0;
      var Haskell = languages[mysqlToGithubMap['Haskell']] || 0;
      var Papyrus = languages[mysqlToGithubMap['Papyrus']] || 0;
      var Common_Lisp = languages[mysqlToGithubMap['Common_Lisp']] || 0;
      var Puppet = languages[mysqlToGithubMap['Puppet']] || 0;
      var TypeScript = languages[mysqlToGithubMap['TypeScript']] || 0;
      var D = languages[mysqlToGithubMap['D']] || 0;
      var Smalltalk = languages[mysqlToGithubMap['Smalltalk']] || 0;
      var Matlab = languages[mysqlToGithubMap['Matlab']] || 0;
      var Elixir = languages[mysqlToGithubMap['Elixir']] || 0;
      var Groovy = languages[mysqlToGithubMap['Groovy']] || 0;
      var Hack = languages[mysqlToGithubMap['Hack']] || 0;
      var Frege = languages[mysqlToGithubMap['Frege']] || 0;
      var Erlang = languages[mysqlToGithubMap['Erlang']] || 0;
      var Julia = languages[mysqlToGithubMap['Julia']] || 0;
      var LiveScript = languages[mysqlToGithubMap['LiveScript']] || 0;
      var Mercury = languages[mysqlToGithubMap['Mercury']] || 0;
      var Elm = languages[mysqlToGithubMap['Elm']] || 0;
      var Scheme = languages[mysqlToGithubMap['Scheme']] || 0;
      var Objective_Cplusplus = languages[mysqlToGithubMap['Objective_Cplusplus']] || 0;
      var XSLT = languages[mysqlToGithubMap['XSLT']] || 0;
      var SQF = languages[mysqlToGithubMap['SQF']] || 0;
      var Tcl = languages[mysqlToGithubMap['Tcl']] || 0;
      var Processing = languages[mysqlToGithubMap['Processing']] || 0;
      var Perl6 = languages[mysqlToGithubMap['Perl6']] || 0;
      var PowerShell = languages[mysqlToGithubMap['PowerShell']] || 0;
      var PureScript = languages[mysqlToGithubMap['PureScript']] || 0;
      var Gnuplot = languages[mysqlToGithubMap['Gnuplot']] || 0;
      var Vala = languages[mysqlToGithubMap['Vala']] || 0;
      var LoomScript = languages[mysqlToGithubMap['LoomScript']] || 0;
      var Nimrod = languages[mysqlToGithubMap['Nimrod']] || 0;
      var Verilog = languages[mysqlToGithubMap['Verilog']] || 0;
      var ActionScript = languages[mysqlToGithubMap['ActionScript']] || 0;
      var SuperCollider = languages[mysqlToGithubMap['SuperCollider']] || 0;
      var Haxe = languages[mysqlToGithubMap['Haxe']] || 0;
      var PigLatin = languages[mysqlToGithubMap['PigLatin']] || 0;
      var Idris = languages[mysqlToGithubMap['Idris']] || 0;
      var VHDL = languages[mysqlToGithubMap['VHDL']] || 0;
      var SystemVerilog = languages[mysqlToGithubMap['SystemVerilog']] || 0;
      var Dart = languages[mysqlToGithubMap['Dart']] || 0;
      var Parrot = languages[mysqlToGithubMap['Parrot']] || 0;
      var Cuda = languages[mysqlToGithubMap['Cuda']] || 0;
      var Bison = languages[mysqlToGithubMap['Bison']] || 0;
      var Mathematica = languages[mysqlToGithubMap['Mathematica']] || 0;
      var xBase = languages[mysqlToGithubMap['xBase']] || 0;
      var Inform_7 = languages[mysqlToGithubMap['Inform_7']] || 0;
      var Nix = languages[mysqlToGithubMap['Nix']] || 0;
      var Coq = languages[mysqlToGithubMap['Coq']] || 0;
      var AGS_Script = languages[mysqlToGithubMap['AGS_Script']] || 0;
      var SourcePawn = languages[mysqlToGithubMap['SourcePawn']] || 0;
      var OpenSCAD = languages[mysqlToGithubMap['OpenSCAD']] || 0;
      var ColdFusion = languages[mysqlToGithubMap['ColdFusion']] || 0;
      var ANTLR = languages[mysqlToGithubMap['ANTLR']] || 0;
      var SequelDB = languages[mysqlToGithubMap['SequelDB']] || 0;
      var Xtend = languages[mysqlToGithubMap['Xtend']] || 0;
      var AutoIt = languages[mysqlToGithubMap['AutoIt']] || 0;
      var OpenEdge_ABL = languages[mysqlToGithubMap['OpenEdge_ABL']] || 0;
      var ATS = languages[mysqlToGithubMap['ATS']] || 0;
      var Fsharp = languages[mysqlToGithubMap['Fsharp']] || 0;
      var Max = languages[mysqlToGithubMap['Max']] || 0;
      var AppleScript = languages[mysqlToGithubMap['AppleScript']] || 0;
      var Eiffel = languages[mysqlToGithubMap['Eiffel']] || 0;
      var Gosu = languages[mysqlToGithubMap['Gosu']] || 0;
      var Game_Maker_Language = languages[mysqlToGithubMap['Game_Maker_Language']] || 0;
      var Standard_ML = languages[mysqlToGithubMap['Standard_ML']] || 0;
      var Pure_Data = languages[mysqlToGithubMap['Pure_Data']] || 0;
      var AutoHotkey = languages[mysqlToGithubMap['AutoHotkey']] || 0;
      var Ada = languages[mysqlToGithubMap['Ada']] || 0;
      var SAS = languages[mysqlToGithubMap['SAS']] || 0;
      var Chapel = languages[mysqlToGithubMap['Chapel']] || 0;
      var Forth = languages[mysqlToGithubMap['Forth']] || 0;
      var UnrealScript = languages[mysqlToGithubMap['UnrealScript']] || 0;
      var Stata = languages[mysqlToGithubMap['Stata']] || 0;
      var Logos = languages[mysqlToGithubMap['Logos']] || 0;
      var M = languages[mysqlToGithubMap['M']] || 0;
      var Arc = languages[mysqlToGithubMap['Arc']] || 0;
      var IDL = languages[mysqlToGithubMap['IDL']] || 0;
      var JSONiq = languages[mysqlToGithubMap['JSONiq']] || 0;
      var BitBake = languages[mysqlToGithubMap['BitBake']] || 0;
      var Objective_J = languages[mysqlToGithubMap['Objective_J']] || 0;
      var BlitzBasic = languages[mysqlToGithubMap['BlitzBasic']] || 0;
      var XQuery = languages[mysqlToGithubMap['XQuery']] || 0;
      var Squirrel = languages[mysqlToGithubMap['Squirrel']] || 0;
      var Apex = languages[mysqlToGithubMap['Apex']] || 0;
      var Nemerle = languages[mysqlToGithubMap['Nemerle']] || 0;
      var J = languages[mysqlToGithubMap['J']] || 0;
      var Kotlin = languages[mysqlToGithubMap['Kotlin']] || 0;
      var nesC = languages[mysqlToGithubMap['nesC']] || 0;
      var ooc = languages[mysqlToGithubMap['ooc']] || 0;
      var Agda = languages[mysqlToGithubMap['Agda']] || 0;
      var Factor = languages[mysqlToGithubMap['Factor']] || 0;
      var Crystal = languages[mysqlToGithubMap['Crystal']] || 0;
      var GAP = languages[mysqlToGithubMap['GAP']] || 0;
      var VCL = languages[mysqlToGithubMap['VCL']] || 0;
      var Rebol = languages[mysqlToGithubMap['Rebol']] || 0;
      var LabVIEW = languages[mysqlToGithubMap['LabVIEW']] || 0;
      var Ceylon = languages[mysqlToGithubMap['Ceylon']] || 0;
      var CLIPS = languages[mysqlToGithubMap['CLIPS']] || 0;
      var MoonScript = languages[mysqlToGithubMap['MoonScript']] || 0;
      var ABAP = languages[mysqlToGithubMap['ABAP']] || 0;
      var GAMS = languages[mysqlToGithubMap['GAMS']] || 0;
      var Component_Pascal = languages[mysqlToGithubMap['Component_Pascal']] || 0;
      var COBOL = languages[mysqlToGithubMap['COBOL']] || 0;
      var AspectJ = languages[mysqlToGithubMap['AspectJ']] || 0;
      var Red = languages[mysqlToGithubMap['Red']] || 0;
      var Pan = languages[mysqlToGithubMap['Pan']] || 0;
      var Bluespec = languages[mysqlToGithubMap['Bluespec']] || 0;
      var Nu = languages[mysqlToGithubMap['Nu']] || 0;
      var Isabelle = languages[mysqlToGithubMap['Isabelle']] || 0;
      var EmberScript = languages[mysqlToGithubMap['EmberScript']] || 0;
      var Shen = languages[mysqlToGithubMap['Shen']] || 0;
      var Awk = languages[mysqlToGithubMap['Awk']] || 0;
      var Augeas = languages[mysqlToGithubMap['Augeas']] || 0;
      var Xojo = languages[mysqlToGithubMap['Xojo']] || 0;
      var Io = languages[mysqlToGithubMap['Io']] || 0;
      var LookML = languages[mysqlToGithubMap['LookML']] || 0;
      var Grammatical_Framework = languages[mysqlToGithubMap['Grammatical_Framework']] || 0;
      var PAWN = languages[mysqlToGithubMap['PAWN']] || 0;
      var DOT = languages[mysqlToGithubMap['DOT']] || 0;
      var Boo = languages[mysqlToGithubMap['Boo']] || 0;
      var Bro = languages[mysqlToGithubMap['Bro']] || 0;
      var LSL = languages[mysqlToGithubMap['LSL']] || 0;
      var Lasso = languages[mysqlToGithubMap['Lasso']] || 0;
      var Monkey = languages[mysqlToGithubMap['Monkey']] || 0;
      var NetLogo = languages[mysqlToGithubMap['NetLogo']] || 0;
      var Scilab = languages[mysqlToGithubMap['Scilab']] || 0;
      var Delphi = languages[mysqlToGithubMap['Delphi']] || 0;
      var Brightscript = languages[mysqlToGithubMap['Brightscript']] || 0;
      var KRL = languages[mysqlToGithubMap['KRL']] || 0;
      var Golo = languages[mysqlToGithubMap['Golo']] || 0;
      var Grace = languages[mysqlToGithubMap['Grace']] || 0;
      var FLUX = languages[mysqlToGithubMap['FLUX']] || 0;
      var APL = languages[mysqlToGithubMap['APL']] || 0;
      var Glyph = languages[mysqlToGithubMap['Glyph']] || 0;
      var GDScript = languages[mysqlToGithubMap['GDScript']] || 0;
      var Fantom = languages[mysqlToGithubMap['Fantom']] || 0;
      var Logtalk = languages[mysqlToGithubMap['Logtalk']] || 0;
      var Alloy = languages[mysqlToGithubMap['Alloy']] || 0;
      var PogoScript = languages[mysqlToGithubMap['PogoScript']] || 0;
      var XML = languages[mysqlToGithubMap['XML']] || 0;
      var Oz = languages[mysqlToGithubMap['Oz']] || 0;
      var IGOR_Pro = languages[mysqlToGithubMap['IGOR_Pro']] || 0;
      var wisp = languages[mysqlToGithubMap['wisp']] || 0;
      var Hy = languages[mysqlToGithubMap['Hy']] || 0;
      var Slash = languages[mysqlToGithubMap['Slash']] || 0;
      var Zephir = languages[mysqlToGithubMap['Zephir']] || 0;
      var Pike = languages[mysqlToGithubMap['Pike']] || 0;
      var Opal = languages[mysqlToGithubMap['Opal']] || 0;
      var REALbasic = languages[mysqlToGithubMap['REALbasic']] || 0;
      var BlitzMax = languages[mysqlToGithubMap['BlitzMax']] || 0;
      var XC = languages[mysqlToGithubMap['XC']] || 0;
      var Rouge = languages[mysqlToGithubMap['Rouge']] || 0;
      var Fancy = languages[mysqlToGithubMap['Fancy']] || 0;
      var Ox = languages[mysqlToGithubMap['Ox']] || 0;
      var Clean = languages[mysqlToGithubMap['Clean']] || 0;
      var RobotFramework = languages[mysqlToGithubMap['RobotFramework']] || 0;
      var Dylan = languages[mysqlToGithubMap['Dylan']] || 0;
      var PureBasic = languages[mysqlToGithubMap['PureBasic']] || 0;
      var TXL = languages[mysqlToGithubMap['TXL']] || 0;
      var Jasmin = languages[mysqlToGithubMap['Jasmin']] || 0;
      var Mirah = languages[mysqlToGithubMap['Mirah']] || 0;
      var XProc = languages[mysqlToGithubMap['XProc']] || 0;
      var Thrift = languages[mysqlToGithubMap['Thrift']] || 0;
      var Ragel_in_Ruby_Host = languages[mysqlToGithubMap['Ragel_in_Ruby_Host']] || 0;
      var Turing = languages[mysqlToGithubMap['Turing']] || 0;
      var Ecl = languages[mysqlToGithubMap['Ecl']] || 0;
      var DCPU_16_ASM = languages[mysqlToGithubMap['DCPU_16_ASM']] || 0;
      var Cycript = languages[mysqlToGithubMap['Cycript']] || 0;
      var Self = languages[mysqlToGithubMap['Self']] || 0;
      var Cool = languages[mysqlToGithubMap['Cool']] || 0;
      var Oxygene = languages[mysqlToGithubMap['Oxygene']] || 0;
      var Volt = languages[mysqlToGithubMap['Volt']] || 0;
      var Opa = languages[mysqlToGithubMap['Opa']] || 0;
      var E = languages[mysqlToGithubMap['E']] || 0;
      var WebIDL = languages[mysqlToGithubMap['WebIDL']] || 0;
      var Capn_Proto = languages[mysqlToGithubMap['Capn_Proto']] || 0;
      var eC = languages[mysqlToGithubMap['eC']] || 0;

      //this is now working except for the country code. i need to do some formatting around the country code to handle it being a string and the table expecting a varchar, or something like that. 
      
      sqlInsert = "INSERT INTO countriesAggregated (countryCode, userCount, Csharp, Prolog, C, Python, Objective_C, CSS, JavaScript, TeX, PHP, Java, FORTRAN, Go, Cplusplus, Swift, Ruby, VimL, Lua, Emacs_Lisp, OCaml, R, Propeller_Spin, Shell, Arduino, Pascal, DM, Scala, ASP, Visual_Basic, Assembly, Perl, CoffeeScript, Clojure, Makefile, Rust, Racket, Haskell, Papyrus, Common_Lisp, Puppet, TypeScript, D, Smalltalk, Matlab, Elixir, Groovy, Hack, Frege, Erlang, Julia, LiveScript, Mercury, Elm, Scheme, Objective_Cplusplus, XSLT, SQF, Tcl, Processing, Perl6, PowerShell, PureScript, Gnuplot, Vala, LoomScript, Nimrod, Verilog, ActionScript, SuperCollider, Haxe, PigLatin, Idris, VHDL, SystemVerilog, Dart, Parrot, Cuda, Bison, Mathematica, xBase, Inform_7, Nix, Coq, AGS_Script, SourcePawn, OpenSCAD, ColdFusion, ANTLR, SequelDB, Xtend, AutoIt, OpenEdge_ABL, ATS, Fsharp, Max, AppleScript, Eiffel, Gosu, Game_Maker_Language, Standard_ML, Pure_Data, AutoHotkey, Ada, SAS, Chapel, Forth, UnrealScript, Stata, Logos, M, Arc, IDL, JSONiq, BitBake, Objective_J, BlitzBasic, XQuery, Squirrel, Apex, Nemerle, J, Kotlin, nesC, ooc, Agda, Factor, Crystal, GAP, VCL, Rebol, LabVIEW, Ceylon, CLIPS, MoonScript, ABAP, GAMS, Component_Pascal, COBOL, AspectJ, Red, Pan, Bluespec, Nu, Isabelle, EmberScript, Shen, Awk, Augeas, Xojo, Io, LookML, Grammatical_Framework, PAWN, DOT, Boo, Bro, LSL, Lasso, Monkey, NetLogo, Scilab, Delphi, Brightscript, KRL, Golo, Grace, FLUX, APL, Glyph, GDScript, Fantom, Logtalk, Alloy, PogoScript, XML, Oz, IGOR_Pro, wisp, Hy, Slash, Zephir, Pike, Opal, REALbasic, BlitzMax, XC, Rouge, Fancy, Ox, Clean, RobotFramework, Dylan, PureBasic, TXL, Jasmin, Mirah, XProc, Thrift, Ragel_in_Ruby_Host, Turing, Ecl, DCPU_16_ASM, Cycript, Self, Cool, Oxygene, Volt, Opa, E, WebIDL, Capn_Proto, eC ) VALUES ('" + countryCode + "' , " + userCount + ',' + Csharp + ',' + Prolog + ',' + C + ',' + Python + ',' + Objective_C + ',' + CSS + ',' + JavaScript + ',' + TeX + ',' + PHP + ',' + Java + ',' + FORTRAN + ',' + Go + ',' + Cplusplus + ',' + Swift + ',' + Ruby + ',' + VimL + ',' + Lua + ',' + Emacs_Lisp + ',' + OCaml + ',' + R + ',' + Propeller_Spin + ',' + Shell + ',' + Arduino + ',' + Pascal + ',' + DM + ',' + Scala + ',' + ASP + ',' + Visual_Basic + ',' + Assembly + ',' + Perl + ',' + CoffeeScript + ',' + Clojure + ',' + Makefile + ',' + Rust + ',' + Racket + ',' + Haskell + ',' + Papyrus + ',' + Common_Lisp + ',' + Puppet + ',' + TypeScript + ',' + D + ',' + Smalltalk + ',' + Matlab + ',' + Elixir + ',' + Groovy + ',' + Hack + ',' + Frege + ',' + Erlang + ',' + Julia + ',' + LiveScript + ',' + Mercury + ',' + Elm + ',' + Scheme + ',' + Objective_Cplusplus + ',' + XSLT + ',' + SQF + ',' + Tcl + ',' + Processing + ',' + Perl6 + ',' + PowerShell + ',' + PureScript + ',' + Gnuplot + ',' + Vala + ',' + LoomScript + ',' + Nimrod + ',' + Verilog + ',' + ActionScript + ',' + SuperCollider + ',' + Haxe + ',' + PigLatin + ',' + Idris + ',' + VHDL + ',' + SystemVerilog + ',' + Dart + ',' + Parrot + ',' + Cuda + ',' + Bison + ',' + Mathematica + ',' + xBase + ',' + Inform_7 + ',' + Nix + ',' + Coq + ',' + AGS_Script + ',' + SourcePawn + ',' + OpenSCAD + ',' + ColdFusion + ',' + ANTLR + ',' + SequelDB + ',' + Xtend + ',' + AutoIt + ',' + OpenEdge_ABL + ',' + ATS + ',' + Fsharp + ',' + Max + ',' + AppleScript + ',' + Eiffel + ',' + Gosu + ',' + Game_Maker_Language + ',' + Standard_ML + ',' + Pure_Data + ',' + AutoHotkey + ',' + Ada + ',' + SAS + ',' + Chapel + ',' + Forth + ',' + UnrealScript + ',' + Stata + ',' + Logos + ',' + M + ',' + Arc + ',' + IDL + ',' + JSONiq + ',' + BitBake + ',' + Objective_J + ',' + BlitzBasic + ',' + XQuery + ',' + Squirrel + ',' + Apex + ',' + Nemerle + ',' + J + ',' + Kotlin + ',' + nesC + ',' + ooc + ',' + Agda + ',' + Factor + ',' + Crystal + ',' + GAP + ',' + VCL + ',' + Rebol + ',' + LabVIEW + ',' + Ceylon + ',' + CLIPS + ',' + MoonScript + ',' + ABAP + ',' + GAMS + ',' + Component_Pascal + ',' + COBOL + ',' + AspectJ + ',' + Red + ',' + Pan + ',' + Bluespec + ',' + Nu + ',' + Isabelle + ',' + EmberScript + ',' + Shen + ',' + Awk + ',' + Augeas + ',' + Xojo + ',' + Io + ',' + LookML + ',' + Grammatical_Framework + ',' + PAWN + ',' + DOT + ',' + Boo + ',' + Bro + ',' + LSL + ',' + Lasso + ',' + Monkey + ',' + NetLogo + ',' + Scilab + ',' + Delphi + ',' + Brightscript + ',' + KRL + ',' + Golo + ',' + Grace + ',' + FLUX + ',' + APL + ',' + Glyph + ',' + GDScript + ',' + Fantom + ',' + Logtalk + ',' + Alloy + ',' + PogoScript + ',' + XML + ',' + Oz + ',' + IGOR_Pro + ',' + wisp + ',' + Hy + ',' + Slash + ',' + Zephir + ',' + Pike + ',' + Opal + ',' + REALbasic + ',' + BlitzMax + ',' + XC + ',' + Rouge + ',' + Fancy + ',' + Ox + ',' + Clean + ',' + RobotFramework + ',' + Dylan + ',' + PureBasic + ',' + TXL + ',' + Jasmin + ',' + Mirah + ',' + XProc + ',' + Thrift + ',' + Ragel_in_Ruby_Host + ',' + Turing + ',' + Ecl + ',' + DCPU_16_ASM + ',' + Cycript + ',' + Self + ',' + Cool + ',' + Oxygene + ',' + Volt + ',' + Opa + ',' + E + ',' + WebIDL + ',' + Capn_Proto + ',' + eC + ')';
      
      db.query(sqlInsert, function() {
            res.end('inserted into the db!');
      });
    }

  }
}


//various iterations of the insert statement: 

//with quotes around the field names: 
 // sqlInsert = "INSERT INTO countriesAggregated ('countryCode', 'userCount', 'Csharp', 'Prolog', 'C', 'Python', 'Objective_C', 'CSS', 'JavaScript', 'TeX', 'PHP', 'Java', 'FORTRAN', 'Go', 'Cplusplus', 'Swift', 'Ruby', 'VimL', 'Lua', 'Emacs_Lisp', 'OCaml', 'R', 'Propeller_Spin', 'Shell', 'Arduino', 'Pascal', 'DM', 'Scala', 'ASP', 'Visual_Basic', 'Assembly', 'Perl', 'CoffeeScript', 'Clojure', 'Makefile', 'Rust', 'Racket', 'Haskell', 'Papyrus', 'Common_Lisp', 'Puppet', 'TypeScript', 'D', 'Smalltalk', 'Matlab', 'Elixir', 'Groovy', 'Hack', 'Frege', 'Erlang', 'Julia', 'LiveScript', 'Mercury', 'Elm', 'Scheme', 'Objective_Cplusplus', 'XSLT', 'SQF', 'Tcl', 'Processing', 'Perl6', 'PowerShell', 'PureScript', 'Gnuplot', 'Vala', 'LoomScript', 'Nimrod', 'Verilog', 'ActionScript', 'SuperCollider', 'Haxe', 'PigLatin', 'Idris', 'VHDL', 'SystemVerilog', 'Dart', 'Parrot', 'Cuda', 'Bison', 'Mathematica', 'xBase', 'Inform_7', 'Nix', 'Coq', 'AGS_Script', 'SourcePawn', 'OpenSCAD', 'ColdFusion', 'ANTLR', 'SequelDB', 'Xtend', 'AutoIt', 'OpenEdge_ABL', 'ATS', 'Fsharp', 'Max', 'AppleScript', 'Eiffel', 'Gosu', 'Game_Maker_Language', 'Standard_ML', 'Pure_Data', 'AutoHotkey', 'Ada', 'SAS', 'Chapel', 'Forth', 'UnrealScript', 'Stata', 'Logos', 'M', 'Arc', 'IDL', 'JSONiq', 'BitBake', 'Objective_J', 'BlitzBasic', 'XQuery', 'Squirrel', 'Apex', 'Nemerle', 'J', 'Kotlin', 'nesC', 'ooc', 'Agda', 'Factor', 'Crystal', 'GAP', 'VCL', 'Rebol', 'LabVIEW', 'Ceylon', 'CLIPS', 'MoonScript', 'ABAP', 'GAMS', 'Component_Pascal', 'COBOL', 'AspectJ', 'Red', 'Pan', 'Bluespec', 'Nu', 'Isabelle', 'EmberScript', 'Shen', 'Awk', 'Augeas', 'Xojo', 'Io', 'LookML', 'Grammatical_Framework', 'PAWN', 'DOT', 'Boo', 'Bro', 'LSL', 'Lasso', 'Monkey', 'NetLogo', 'Scilab', 'Delphi', 'Brightscript', 'KRL', 'Golo', 'Grace', 'FLUX', 'APL', 'Glyph', 'GDScript', 'Fantom', 'Logtalk', 'Alloy', 'PogoScript', 'XML', 'Oz', 'IGOR_Pro', 'wisp', 'Hy', 'Slash', 'Zephir', 'Pike', 'Opal', 'REALbasic', 'BlitzMax', 'XC', 'Rouge', 'Fancy', 'Ox', 'Clean', 'RobotFramework', 'Dylan', 'PureBasic', 'TXL', 'Jasmin', 'Mirah', 'XProc', 'Thrift', 'Ragel_in_Ruby_Host', 'Turing', 'Ecl', 'DCPU_16_ASM', 'Cycript', 'Self', 'Cool', 'Oxygene', 'Volt', 'Opa', 'E', 'WebIDL', 'Capn_Proto', 'eC', ) VALUES (" + countryCode + ',' + userCount + ',' + Csharp + ',' + Prolog + ',' + C + ',' + Python + ',' + Objective_C + ',' + CSS + ',' + JavaScript + ',' + TeX + ',' + PHP + ',' + Java + ',' + FORTRAN + ',' + Go + ',' + Cplusplus + ',' + Swift + ',' + Ruby + ',' + VimL + ',' + Lua + ',' + Emacs_Lisp + ',' + OCaml + ',' + R + ',' + Propeller_Spin + ',' + Shell + ',' + Arduino + ',' + Pascal + ',' + DM + ',' + Scala + ',' + ASP + ',' + Visual_Basic + ',' + Assembly + ',' + Perl + ',' + CoffeeScript + ',' + Clojure + ',' + Makefile + ',' + Rust + ',' + Racket + ',' + Haskell + ',' + Papyrus + ',' + Common_Lisp + ',' + Puppet + ',' + TypeScript + ',' + D + ',' + Smalltalk + ',' + Matlab + ',' + Elixir + ',' + Groovy + ',' + Hack + ',' + Frege + ',' + Erlang + ',' + Julia + ',' + LiveScript + ',' + Mercury + ',' + Elm + ',' + Scheme + ',' + Objective_Cplusplus + ',' + XSLT + ',' + SQF + ',' + Tcl + ',' + Processing + ',' + Perl6 + ',' + PowerShell + ',' + PureScript + ',' + Gnuplot + ',' + Vala + ',' + LoomScript + ',' + Nimrod + ',' + Verilog + ',' + ActionScript + ',' + SuperCollider + ',' + Haxe + ',' + PigLatin + ',' + Idris + ',' + VHDL + ',' + SystemVerilog + ',' + Dart + ',' + Parrot + ',' + Cuda + ',' + Bison + ',' + Mathematica + ',' + xBase + ',' + Inform_7 + ',' + Nix + ',' + Coq + ',' + AGS_Script + ',' + SourcePawn + ',' + OpenSCAD + ',' + ColdFusion + ',' + ANTLR + ',' + SequelDB + ',' + Xtend + ',' + AutoIt + ',' + OpenEdge_ABL + ',' + ATS + ',' + Fsharp + ',' + Max + ',' + AppleScript + ',' + Eiffel + ',' + Gosu + ',' + Game_Maker_Language + ',' + Standard_ML + ',' + Pure_Data + ',' + AutoHotkey + ',' + Ada + ',' + SAS + ',' + Chapel + ',' + Forth + ',' + UnrealScript + ',' + Stata + ',' + Logos + ',' + M + ',' + Arc + ',' + IDL + ',' + JSONiq + ',' + BitBake + ',' + Objective_J + ',' + BlitzBasic + ',' + XQuery + ',' + Squirrel + ',' + Apex + ',' + Nemerle + ',' + J + ',' + Kotlin + ',' + nesC + ',' + ooc + ',' + Agda + ',' + Factor + ',' + Crystal + ',' + GAP + ',' + VCL + ',' + Rebol + ',' + LabVIEW + ',' + Ceylon + ',' + CLIPS + ',' + MoonScript + ',' + ABAP + ',' + GAMS + ',' + Component_Pascal + ',' + COBOL + ',' + AspectJ + ',' + Red + ',' + Pan + ',' + Bluespec + ',' + Nu + ',' + Isabelle + ',' + EmberScript + ',' + Shen + ',' + Awk + ',' + Augeas + ',' + Xojo + ',' + Io + ',' + LookML + ',' + Grammatical_Framework + ',' + PAWN + ',' + DOT + ',' + Boo + ',' + Bro + ',' + LSL + ',' + Lasso + ',' + Monkey + ',' + NetLogo + ',' + Scilab + ',' + Delphi + ',' + Brightscript + ',' + KRL + ',' + Golo + ',' + Grace + ',' + FLUX + ',' + APL + ',' + Glyph + ',' + GDScript + ',' + Fantom + ',' + Logtalk + ',' + Alloy + ',' + PogoScript + ',' + XML + ',' + Oz + ',' + IGOR_Pro + ',' + wisp + ',' + Hy + ',' + Slash + ',' + Zephir + ',' + Pike + ',' + Opal + ',' + REALbasic + ',' + BlitzMax + ',' + XC + ',' + Rouge + ',' + Fancy + ',' + Ox + ',' + Clean + ',' + RobotFramework + ',' + Dylan + ',' + PureBasic + ',' + TXL + ',' + Jasmin + ',' + Mirah + ',' + XProc + ',' + Thrift + ',' + Ragel_in_Ruby_Host + ',' + Turing + ',' + Ecl + ',' + DCPU_16_ASM + ',' + Cycript + ',' + Self + ',' + Cool + ',' + Oxygene + ',' + Volt + ',' + Opa + ',' + E + ',' + WebIDL + ',' + Capn_Proto + ',' + eC + ')';
      
