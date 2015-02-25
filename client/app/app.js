var React = require('react');
var DevSearchApp = require('./components/DevSearchApp.react');
var ProfilesApp = require('./components/ProfilesApp.react');

React.render(
  <DevSearchApp />,
  document.getElementById('devsearchapp')
);

React.render(
  <ProfilesApp />,
  document.getElementById('profiles')
);