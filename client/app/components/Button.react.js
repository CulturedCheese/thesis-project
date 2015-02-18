var React = require('react');
var ReactPropTypes = React.PropTypes;
var React = require('react/addons');

var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var ButtonsInstance = (
    <ButtonToolbar>
      <Button>Submit</Button>
      <Button>Cancel</Button>
    </ButtonToolbar>
);

React.render(
    <ButtonsInstance />,
    document.getElementById('button')
);