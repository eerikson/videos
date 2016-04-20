'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var babelify = require('babelify');
var sass = require('gulp-sass');

var paths = {
	src : {
		scripts : './src/js/',
		styles : './src/css/'
	},
	dist : {
		scripts : './dist/js/',
		styles : './dist/css/'
	}
};

/*
*  Run a simple local webserver.
*  Use port 80, which looks prettier, but requires admin privileges.
*/
gulp.task('server', function() {
	connect.server({
    root: 'dist',
		port: 80
  });
});

/*
*  Scripts task.
*  - Browserify for CommonJS dependencies & concatenation.
*  - Use 'reactify' transform for React compatibility.
*  - (disabled) Generate source maps.
*  - (disabled) Uglify.
*/

gulp.task('scripts', function () {
  var b = browserify({
    entries: paths.src.scripts + 'main.js',
    debug: true
  }).transform('babelify', {presets: ['es2015', 'react']})
	.transform('hbsfy');

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.dist.scripts));
});


gulp.task('styles', function () {
  return gulp.src(paths.src.styles + '/main.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
    .pipe(gulp.dest(paths.dist.styles));
});

/*
*  Watch files for changes.
*/
gulp.task('watch', function() {
  gulp.watch(paths.src.scripts + '**/*.*', ['scripts']);
  gulp.watch(paths.src.styles + '**/*.*', ['styles']);
});

/*
*  Default task.
*/
gulp.task('default', ['watch', 'scripts', 'styles']);

