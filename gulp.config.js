'use strict';

module.exports = function() {
  var client = './client/';
  var server = './server/';
  var tests = './__tests__/';
  var pub = './public/';
  var build = './build/'; 
  var config = {
      /**
       * Files paths
       */
      alljs: [
          client + '**/*.js',
          // tests + '**/*.js', // uncomment this line to include test files 
          '!' + client + 'bower_components/**/*.js' // exclude bower component js files
          // server + '**/*.js'
      ],
      build: build,
      client: client,
      clientJS: client + 'app/app.js',
      clientTests: client + 'clientSpec.js', 
      index: client + 'index.html',
      less: client + 'styles/styles.less',
      pub: pub,
      server: server,
      tests: tests,

      /**
       * Bower and NPM locations
       */
      bower: {
          json: require('./bower.json'),
          directory: client + 'bower_components/',
          ignorePath: '../..'
      },
      packages: [
          './package.json',
          './bower.json'
      ],

      /**
       * Node settings
       */
      buildPort: 9999,
      defaultPort: 7203,
      nodeServer: server + 'server.js'

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
