'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
 /*jshint -W079 */
var $ = require('gulp-load-plugins')({lazy: true});
// var port = process.env.PORT || config.defaultPort;

// provides a list of all tasks in gulpfile
gulp.task('help', $.taskListing);

// runs the 'help' task by default
gulp.task('default', ['help']);

// checks code syntax and style with JSHint and JSCS
gulp.task('vet', function() {
  console.log('Analyzing source with JSHint and JSCS');

  return gulp
      // reads all js files into the stream
      .src(config.alljs)
      // prints all files being piped through the stream
      .pipe($.if(args.verbose, $.print()))
      // lints code style to enforce style guide
      .pipe($.jscs())
      .pipe($.jshint())
      // adds formatting to the jshint log
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      // outputs 'fail' to the console
      .pipe($.jshint.reporter('fail'));
});

// injects dependencies into HTML
gulp.task('wiredep', function() {
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;
  return gulp
      // reads the index.html file
      .src(config.index)
      // checks Bower components and injects into config.index
      .pipe(wiredep(options))
      // takes all config.js files and injects into config.index
      .pipe($.inject(gulp.src(config.alljs)))
      // writes transformed config.index to folder
      .pipe(gulp.dest(config.client));
});
