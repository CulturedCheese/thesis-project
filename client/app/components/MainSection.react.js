/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var DevSearchActions = require('../actions/DevSearchActions');
var LanguageDropdownMenu = require('./LanguageDropdownMenu.react');

// var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({

  propTypes: {
    // allTodos: ReactPropTypes.object.isRequired,
    // areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    console.log('this.props.countryData', this.props.countryData);

    return (
      <section id="main">
        
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  // _onToggleCompleteAll: function() {
  //   DevSearchActions.toggleCompleteAll();
  // }

});

module.exports = MainSection;
