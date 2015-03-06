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

    if (workflow === "initialWorkflow") {
      workflowType = "INITIAL";
    }

    AppDispatcher.handleViewAction({
      actionType: "DISPLAY_" + workflowType + "_DATA",
      input: input
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
