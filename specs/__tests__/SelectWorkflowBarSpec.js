'use strict';
/** @jsx React.DOM */

jest.dontMock('../../client/app/components/SelectWorkflowBar.react.js');
describe('SelectWorkflowBar', function() {
  it('should have no value on initial page load', function() {
    var React = require('react/addons');
    var SelectWorkflowBar = require('../../client/app/components/SelectWorkflowBar.react.js');
    var TestUtils = React.addons.TestUtils;

    // Render the SelectWorkflowBar in the document
    var selectWorkflowBar = TestUtils.renderIntoDocument(
      <SelectWorkflowBar />
    );

    var select = TestUtils.findRenderedDOMComponentWithTag(
      selectWorkflowBar, 'select');
    expect(select.getDOMNode().textContent).toEqual('');
  });

  it('changes the value after click', function() {
    var React = require('react/addons');
    var SelectWorkflowBar = require('../../client/app/components/SelectWorkflowBar.react.js');
    var TestUtils = React.addons.TestUtils;

    // Render the SelectWorkflowBar in the document
    var selectWorkflowBar = TestUtils.renderIntoDocument(
      <SelectWorkflowBar />
    );

    var select = TestUtils.findRenderedDOMComponentWithTag(
      selectWorkflowBar, 'select');
    TestUtils.Simulate.change(select, {option: {value: 'languageWorkflow'}});
    expect(selectWorkflowBar.refs.workflow.getDOMNode().textContent).toEqual('languageWorkflow');
  });
});
