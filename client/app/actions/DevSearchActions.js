var AppDispatcher = require('../dispatcher/AppDispatcher');
var DevSearchConstants = require('../constants/DevSearchConstants');


var DevSearchActions = {

  displayData: function(input, workflow) {
    var workflowType;
    if (workflow === "countryWorkflow") {
      workflowType = "COUNTRY";
    }
    
    if (workflow === "languageWorkflow") {
      workflowType = "LANGUAGE";
    }

    AppDispatcher.handleViewAction({
      actionType: "DISPLAY_" + workflowType + "_DATA",
      input: input
    });
  },

  displayGithubHandles: function(country,language) {
    console.log("heard a displayGithubHandles in DevSearchActions!", country, language);
    AppDispatcher.handleViewAction({
      actionType: "DISPLAY_GITHUB_HANDLES",
      country: country,
      language: language
    });
  },

  switchWorkflow: function(workflow) {
    console.log("heard a switchWorkflow in DevSearchActions!", workflow);
      AppDispatcher.handleViewAction({
      actionType: "SWITCH_WORKFLOW",
      workflow: workflow
    }); 
  }

};

module.exports = DevSearchActions;
