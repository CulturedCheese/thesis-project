/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the DevSearchStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var Map = require('./Map.react');
var React = require('react');
var DevSearchStore = require('../stores/DevSearchStore');

/**
 * Retrieve the current TODO data from the DevSearchStore
 */
function getDevSearchState() {
  return {
    allTodos: DevSearchStore.getAll(),
    areAllComplete: DevSearchStore.areAllComplete()
  };
}

var DevSearchApp = React.createClass({

  getInitialState: function() {
    return getDevSearchState();
  },

  componentDidMount: function() {
    DevSearchStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DevSearchStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {objDevSearch
   */
  render: function() {
  	return (
      <div>
        <Header />
        <MainSection
          // allTodos={this.state.allTodos}
          // areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the DevSearchStore
   */
  _onChange: function() {
    this.setState(getDevSearchState());
  }

});

module.exports = DevSearchApp;
