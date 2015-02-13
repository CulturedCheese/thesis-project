'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
var minifyCSS = require('gulp-minify-css');
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

// run gulp clean prior to each build to delete the previous build
gulp.task('clean', function() {
    gulp.src(config.build + '*')
      .pipe($.clean({force: true}));
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

// bundles code to be served by the backend
gulp.task('browserify-client', ['vet'], function() {
  console.log('Bundling client code...');

  return gulp
      .src(config.clientJS)
      .pipe($.browserify({
        insertGlobals: true,
        debug: true
      }))
      .pipe($.rename('bundled.js'))
      .pipe(gulp.dest(config.build))
      .pipe(gulp.dest(config.pub + 'javascripts'));

});

// minifies bundled client code
gulp.task('minify-js', ['browserify-client'], function() {
  return gulp.src(config.build + 'bundled.js')
      .pipe($.uglify())
      .pipe($.rename('bundled.min.js'))
      .pipe(gulp.dest(config.build))
      .pipe(gulp.dest(config.pub + 'javascripts'));
});

// compiles LESS to CSS and saves CSS to public folder
gulp.task('styles', function() {
  console.log('Compiling Less --> CSS');

  return gulp
      .src(config.less)
      .pipe($.plumber())
      .pipe($.less())
      .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
      .pipe(gulp.dest(config.build))
      .pipe(gulp.dest(config.pub + 'stylesheets'));
});

// minifies the css file compiled from less
gulp.task('minify-css', ['styles'], function() {
  return gulp
      .src(config.build + 'styles.css')
      .pipe(minifyCSS())
      .pipe($.rename('styles.min.css'))
      .pipe(gulp.dest(config.build))
      .pipe(gulp.dest(config.pub + 'stylesheets'));
});

gulp.task('copy-bower-components', function () {
  gulp.src(config.client + 'bower_components/**')
    .pipe(gulp.dest(config.build + 'bower_components'));
});

gulp.task('copy-html-files', function () {
  gulp.src(config.client + '**/*.html')
    .pipe(gulp.dest(config.build));
});

gulp.task('build', ['wiredep', 
  'vet',
  'browserify-client',
  'styles', 
  'minify-css', 
  'minify-js', 
  'copy-html-files',
  // 'copy-bower-components',
  'connectBuild']);

// gulp plugin for the Jest test library
gulp.task('test', ['vet', 'browserify-client'], function () {
    return gulp
        .src(config.clientTests)
        .pipe($.jest({
        scriptPreprocessor: "./spec/support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testDirectoryName: "spec",
        testPathIgnorePatterns: [
            "node_modules",
            "spec/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});

// serve app on a development server running on default port
gulp.task('connect', function() {
  $.connect.server({
    root: config.client,
    port: config.defaultPort
  });
});

// serve and test final build on a staging server before deployment
gulp.task('connectBuild', function() {
  $.connect.server({
    root: config.build,
    port: config.buildPort
  });
});

// watches for changes to js files and runs necessary tasks
gulp.task('watch', function() {
  gulp.watch(config.alljs, ['vet','browserify-client','test']);
  gulp.watch(config.clientTests, ['test']);
});
