/**
 * Helpful utilities for projects
 *
 * @type {Object} commonAU object
 */
var commonAU = {
  debugger: function( errorMessage ) {
    errorMessage = '';
    return 'cAU: ' + '\n' + errorMessage;
    debugger;
  },
  debug: false
}

/**
 * A console.error prototype
 *
 * - Callable with `console.commonAU( "The error" )`
 *
 * @since  0.1
 *
 * @return {[console.error object]} [Error object and error message string]
 */
console.commonAU = function() {

  Array.prototype.unshift.call(

    arguments,
    commonAU.debugger() );

  console.error.apply( console, arguments );
};
