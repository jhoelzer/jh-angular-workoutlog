/* Gulp is a task manager and can be configured to automate several development tasks.  
These tasks include, but are not limited to, minifying css and js files, concatenating these 
files, piping them into a new file and directory */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

var javascriptFiles = [
	'app.js',
	'./components/**/*.js',
	'./services/**/*.js'
];

gulp.task('bundle', function() {
	return gulp.src(javascriptFiles)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./content'));
});

gulp.task('watch', function() {
	gulp.watch(javascriptFiles, ['bundle']);
});

gulp.task('start-webserver', function() {
	connect.server({ root: '.' });
});

// default task when gulp runs: bundle, starts web server, then watches for changes
gulp.task('default', ['bundle', 'start-webserver', 'watch']);