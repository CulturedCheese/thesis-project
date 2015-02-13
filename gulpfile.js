'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

// provides a list of all tasks in gulpfile
gulp.task('help', $.taskListing);

// runs the 'help' task by default
gulp.task('default',['help']);

// checks code syntax and style with JSHint and JSCS
gulp.task('vet', function() {
  log('Analyzing source with JSHint and JSCS');

  return gulp
      .src(config.alljs) // reads all js files into the stream
      .pipe($.if(args.verbose, $.print())) // prints all files being piped through the stream 
      .pipe($.jscs()) // lints code style to enforce style guide
      .pipe($.jshint()) 
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true})) // adds formatting to the jshint log
      .pipe($.jshint.reporter('fail')); // outputs 'fail' to the console
});

// injects dependencies into HTML
gulp.task('wiredep', function() {
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;
  return gulp
      .src(config.index) // reads the index.html file
      .pipe(wiredep(options)) // checks Bower components
      .pipe($.inject(gulp.src(config.js))) // takes all config.js files and injects into config.index
      .pipe(gulp.dest(config.client)); // writes transformed config.index to folder
});
