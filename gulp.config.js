'use strict';

module.exports = function() {
  var client = './client/';
  var server = './server/';
  var tests = './__tests__/';
  var pub = './public/';
  var dist = './dist/'; 
  var config = {
      /**
       * Files paths
       */
      alljs: [
          tests + '**/*.js',
          client + '*.js',
          '!' + client + 'bower_components/**/*.js' // exclude bower component js files
          // tests + '**/*.js', // uncomment this line to include test files 
          // server + '**/*.js'
      ],
      dist: dist,
      client: client,
      clientTests: tests + 'clientSpec.js',
      css: [
          client + 'styles/app.css',
          client + 'styles/base.css'
      ], 
      index: client + 'index.html',
      js: [
          './client/app/app.js',
          '!' + client + 'app/bundle.min.js',
          '!' + client + 'bower_components/**/*.js' // exclude bower component js files
      ],
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
      distPort: 9999,
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
