// ꜷ
// Require our dependencies
var autoprefixer = require( 'autoprefixer' );
var browserSync = require( 'browser-sync' );
var cheerio = require( 'gulp-cheerio' );
var concat = require( 'gulp-concat' );
var cssnano = require( 'gulp-cssnano' );
var del = require( 'del' );
var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var mqpacker = require( 'css-mqpacker' );
var notify = require( 'gulp-notify' );
var plumber = require( 'gulp-plumber' );
var postcss = require( 'gulp-postcss' );
var reload = browserSync.reload;
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );
var sassLint = require( 'gulp-sass-lint' );
var sort = require( 'gulp-sort' );
var sourcemaps = require( 'gulp-sourcemaps' );
var uglify = require( 'gulp-uglify' );

// Set assets paths.
var paths = {
	css: [ './*.css', '!*.min.css' ],
	sass: [ 'assets/sass/**/*.scss', 'assets/sass/*.scss' ],
	concat_scripts: [ 'assets/js/utility/*.js', 'assets/js/vendor/*.js', 'assets/js/dev/*.js' ],
	scripts: [ 'assets/js/*.js', '!assets/js/*.min.js' ]
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

/**
 * Delete app.css and app.min.css before we minify and optimize
 */
gulp.task( 'clean:styles', function() {
	return del( [ 'app.css', 'app.min.css' ] )
} );

/**
 * Compile Sass and run stylesheet through PostCSS.
 *
 * https://www.npmjs.com/package/gulp-sass
 * https://www.npmjs.com/package/gulp-postcss
 * https://www.npmjs.com/package/gulp-autoprefixer
 * https://www.npmjs.com/package/css-mqpacker
 */
gulp.task( 'postcss', [ 'clean:styles' ], function() {
	return gulp.src( 'assets/sass/*.scss', paths.css )

	// Deal with errors.
	.pipe( plumber( {
		errorHandler: handleErrors
	} ) )

	// Wrap tasks in a sourcemap.
	.pipe( sourcemaps.init() )

	// Compile Sass using LibSass.
	.pipe( sass( {
		includePaths: [].concat(),
		errLogToConsole: true,
		outputStyle: 'expanded' // Options: nested, expanded, compact, compressed
	} ) )

	// Parse with PostCSS plugins.
	.pipe( postcss( [
			autoprefixer( {
			browsers: [ 'last 2 version' ]
		} ),
			mqpacker( {
			sort: true
		} ),
		] ) )

	// Create sourcemap.
	.pipe( sourcemaps.write() )

	// Create style.css.
	.pipe( gulp.dest( 'assets/css/' ) )
		.pipe( browserSync.stream() );
} );

/**
 * Minify and optimize style.css.
 *
 * https://www.npmjs.com/package/gulp-cssnano
 */
gulp.task( 'cssnano', [ 'postcss' ], function() {
	return gulp.src( 'app.css' )
		.pipe( plumber( {
			errorHandler: handleErrors
		} ) )
		.pipe( cssnano( {
			safe: true // Use safe optimizations
		} ) )
		.pipe( rename( 'assets/css/app.min.css' ) )
		.pipe( gulp.dest( './' ) )
		.pipe( browserSync.stream() );
} );

/**
 * Sass linting.
 *
 * https://www.npmjs.com/package/sass-lint
 */
gulp.task( 'sass:lint', [ 'cssnano' ], function() {
	gulp.src( [
		'assets/sass/**/*.scss',
		'assets/sass/*.scss',
		'!assets/sass/_normalize.scss'
	] )
		.pipe( sassLint() )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
} );

/**
 * Concatenate js after uglified.
 */
gulp.task( 'concat', function() {
	return gulp.src( paths.concat_scripts )
		.pipe( plumber( {
			errorHandler: handleErrors
		} ) )
		.pipe( sourcemaps.init() )
		.pipe( concat( 'app.js' ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( 'assets/js' ) )
		.pipe( browserSync.stream() );
} );

/**
 * Minify javascripts after they're concatenated.
 * https://www.npmjs.com/package/gulp-uglify
 */
gulp.task( 'uglify', [ 'concat' ], function() {
	return gulp.src( paths.scripts )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( uglify( {
			mangle: false
		} ) )
		.pipe( gulp.dest( 'assets/js' ) );
} );

/**
 * Process tasks and reload browsers on file changes.
 *
 * https://www.npmjs.com/package/browser-sync
 */
gulp.task( 'watch', function() {

	browserSync( {
		open: false,
		injectChanges: true,
		proxy: "testing.dev",
		watchOptions: {
			debounceDelay: 1000
		}
	} );

	// Run tasks when files change.
	gulp.watch( paths.sass, [ 'styles' ] );
	gulp.watch( paths.scripts, [ 'scripts' ] );
	gulp.watch( paths.concat_scripts, [ 'scripts' ] );
} );

/**
 * Create individual tasks.
 */
gulp.task( 'scripts', [ 'uglify' ] );
gulp.task( 'styles', [ 'cssnano' ] );
gulp.task( 'default', [ 'styles', 'scripts' ] );
