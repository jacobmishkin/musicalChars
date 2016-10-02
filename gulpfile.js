// ꜷ
// Require our dependencies
var autoprefixer = require( 'autoprefixer' );
var concat = require( 'gulp-concat' );
var gulp = require( 'gulp' );
var plumber = require( 'gulp-plumber' );
var gutil = require( 'gulp-util' );
var notify = require( 'gulp-notify' );
var sass = require( 'gulp-sass' );
var cssmin = require( 'gulp-cssmin' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var sourcemaps = require( 'gulp-sourcemaps' );
var connect = require( 'gulp-connect' );
var browserify = require( 'browserify' );
var watchify = require( 'watchify' );
var babelify = require( 'babelify' );
var source = require( 'vinyl-source-stream' );

// Set assets paths.
var paths = {
	css: [ './src/css/*.css', '!*.min.css' ],
	sass: [ './src/scss/*.scss' ],
	vendor: [ './src/js/vendor/*.js' ],
	dev: [ './src/js/dev/*.js', './src/js/utility/*.js' ]
};

/**
 * Handle errors and alert the user.
 */
function handleErrors() {
	var args = Array.prototype.slice.call( arguments );

	notify.onError( {
		title: 'Task Failed [<%= error.message %>',
		message: 'See console.',
		sound: 'Sosumi'
	} ).apply( this, args );

	gutil.beep();

	this.emit( 'end' );
}

gulp.task( 'sass', function() {
	return gulp.src( './src/scss/app.scss' )
		.pipe( sass() )
		.pipe( gulp.dest( 'build' ) )
		.pipe( connect.reload() )
} );

gulp.task( 'cssmin', [ 'sass' ], function() {
	gulp.src( './build/app.css' )
		.pipe( cssmin() )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( gulp.dest( './build' ) );
} );

gulp.task( 'concatVendor', function() {
	return gulp.src( paths.vendor )
		.pipe( plumber( {
			errorHandler: handleErrors
		} ) )
		.pipe( sourcemaps.init() )
		.pipe( concat( 'vendor.js' ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( 'build' ) )
} );

gulp.task( 'concatDev', function() {
	return gulp.src( paths.dev )
		.pipe( plumber( {
			errorHandler: handleErrors
		} ) )
		.pipe( sourcemaps.init() )
		.pipe( concat( 'app.js' ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( 'build' ) )
} );

gulp.task( 'uglify', [ 'concatVendor', 'concatDev' ], function() {
	return gulp.src( [ './build/vendor.js', './build/app.js' ] )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( uglify( {
			mangle: false
		} ) )
		.pipe( gulp.dest( './build' ) );
} );

gulp.task( 'html', function() {
	gulp.src( './*.html' )
		.pipe( connect.reload() );
} )

gulp.task( 'connect', function() {
	connect.server( {
		root: './',
		livereload: true,
		port: 9090
	} )
} );

gulp.task( 'js', [ 'uglify' ] );
gulp.task( 'styles', [ 'sass', 'cssmin' ] );

gulp.task( 'watch', function() {
	gulp.watch( './src/scss/*.scss', [ 'styles' ] );
	gulp.watch( './src/js/dev/*.js', [ 'js' ] );
	gulp.watch( './src/js/utility/*.js', [ 'js' ] );
	gulp.watch( paths.concat_scripts, [ 'js' ] );
	gulp.watch( paths.scripts, [ 'js' ] );
	gulp.watch( './*.html', [ 'html' ] );
} );

gulp.task( 'default', [ 'styles', 'js', 'connect', 'watch' ] );
