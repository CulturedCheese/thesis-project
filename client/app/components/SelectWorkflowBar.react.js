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
      <form id="search" onSubmit={this.handleSubmit} >
        <select type="text" placeholder="Search by..." ref="workflow">
          <option value="countryWorkflow">Country</option>
          <option value="languageWorkflow">Programming Language</option>
        </select> 
        <button type="submit" >Select</button>
      </form>
    );
  }

});

module.exports = SelectWorkflowBar;