var DevSearchActions = require('../actions/DevSearchActions');
var React = require('react');
var ReactPropTypes = React.PropTypes;

var SelectWorkflowBar = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var workflow = this.refs.workflow.getDOMNode().value;
    DevSearchActions.switchWorkflow(workflow);
  },

  render: function() {
    return (
      <select id="searchdropdown" onChange={this.handleSubmit} placeholder="Search by..." ref="workflow" >
        <button class="btn btn-default dropdown-toggle" placeholder="Search by..." type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
          <span class="caret"></span>
        </button>
        <option value="initialWorkflow">Search by...</option>
        <option value="languageWorkflow">Programming Language</option>
        <option value="countryWorkflow">Country</option>
      </select>
    );
  }

});

module.exports = SelectWorkflowBar;