var oDeskApi = require('odesk-api'), rl = require('readline');
var Q = require('q'); 
var url = require('url');

// configures the authorization request
var config = require('./../../../config.js');
var config = {
  consumerKey : config.odeskAPI,
  consumerSecret : config.odeskSECRET,
  accessToken : config.odeskAccessToken,
  accessSecret : config.odeskAccessSecret,
  debug : false
};
var api = new oDeskApi(config);

module.exports = {
  getCoders: function(req, res) {
		api.setAccessToken(config.accessToken, config.accessSecret, function() {
		  var Search = require('odesk-api/lib/routers/freelancers/search.js').Search;
		  var freelancers = new Search(api);
		  var page = req.url.split("=")[1] || 0;
		  var language = req.url.split("=")[3] || 'JavaScript'; 
		  var country = req.url.split("=")[5] || 'Vietnam'; 
		  var hourlyRate = req.url.split("=")[7] || '100'; 
		  var minScore = req.url.split('=')[9] || 0;
		  var maxScore = req.url.split('=')[11] || 5;

		  var summaryProfiles = {};
		  var params = {'q': 'skills:'+ language + ' AND country:' + country, 'rate': '[0 TO ' + hourlyRate+ ']', 'paging': page + ';8', 'feedback': '[' + minScore + ' TO ' + maxScore + ']'};

		  console.log(language, country, hourlyRate, minScore, maxScore, params);
		  var profiles = Q.nbind(freelancers.find,freelancers);
		  
		  profiles(params)
		    .then(function (results) {
		      var profiles = results.providers; // an array containing a list of 20 freelancer profiles
		      // parse profiles to grab only the name, title, skills, feedback, portrait, id from each profile  
		      var summaryProfiles = profiles.map(function(profile){
		        return {
		          id: profile.id,	
		          name: profile.name,
		          title: profile.title,
		          skills: profile.skills,
		          feedback: profile.feedback,
		          portrait: profile.portrait_50,
		          country: profile.country,
		          description: profile.description,
		          hourlyRate: profile.rate,
		          page: page,
		          url: 'https://www.odesk.com/o/profiles/users/_' + profile.id
		        };
		      });

		      res.send(summaryProfiles);
		    })
		    // .then(function (summaryProfiles) {
      //     var Profile = require('odesk-api/lib/routers/freelancers/profile.js').Profile;
      //     var freelancers = new Profile(api);
      //     var profiles = Q.nbind(summaryProfiles.map, summaryProfiles);
      //     var param = function(summaryProfile){
      //       var bigPortrait;
      //     	var param = summaryProfile.id;
      //     	var profile = Q.nbind(freelancers.getSpecificBrief,freelancers);
      //     	profile(param)
	     //    	  .then(function(result) {
	     //      	  bigPortrait = result.profile.dev_portrait_100;
	     //      	  return bigPortrait;
	     //    	  })
	     //    	  .then(function(bigPortrait) {
	     //    	  	return {
	     //    	  	  id: summaryProfile.id,	
	     //    	  	  name: summaryProfile.name,
	     //    	  	  title: summaryProfile.title,
	     //    	  	  skills: summaryProfile.skills,
	     //    	  	  feedback: summaryProfile.feedback,
	     //    	  	  portrait: bigPortrait,
	     //    	  	  country: summaryProfile.country,
	     //    	  	  hourlyRate: summaryProfile.rate,
	     //    	  	  page: page,
	     //    	  	  url: 'https://www.odesk.com/o/profiles/users/_' + summaryProfile.id
	     //    	  	};
	     //    	  })
	     //    }
          
      //     profiles(param())
      //       .then(function(formattedSummaryProfiles){
      //       	console.log(formattedSummaryProfiles);
      //       })
	     //  });
  	});
  }
};
