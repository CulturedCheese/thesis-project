'use strict';

module.exports = function() {
  var config = {
      /**
       * Files paths
       */
      alljs: [
          './client/*.js',
          './*.js'
      ],
      client: './client/',
      index: './client/index.html',

      server: './server/',

      /**
       * Bower and NPM locations
       */
      bower: {
          json: require('./bower.json'),
          directory: './client/bower_components/',
          ignorePath: '../..'
      },
      packages: [
          './package.json',
          './bower.json'
      ],

      /**
       * Node settings
       */
      defaultPort: 7203,
      nodeServer: './server/server.js'

  };

  config.getWiredepDefaultOptions = function() {
    var options = {
        bowerJson: config.bower.json,
        directory: config.bower.directory,
        ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
