/**
 * Helpful utilities for projects
 *
 * @type {Object} commonAU object
 */
var commonAU = {
  debugger: function( errorMessage ) {
    errorMessage = '';
    return 'Common Gold: ' + '\n' + errorMessage;
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


var auConsoleStyles = [
    'background: linear-gradient(gold, goldenrod)'
    , 'border: 6px solid gold'
    , 'color: black'
    , 'display: block'
    , 'line-height: 24px'
    , 'text-align: left'
    , 'margin: 4px'
    , 'font-weight: bold'
].join( ';' );

console.au = function( message ) {
  console.log( '%c' + ' * Common.au: ' + message, auConsoleStyles + ' *' );
};
