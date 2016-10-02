jQuery( document ).ready( function( $ ) {

	'use strict'

	/**
	 * Color changers
	 */

	var bgcolors = [
	"#F3F315",
	"#C1FD33",
	"#FF9933",
	"#FC5AB8",
	"#0DD5FC",
	"grey",
	"aqua",
	"cornflower",
	"salmon",
	"orange",
	"black",
	"purple",
	"pink"
	];

	function changeBgColor() {
		var el_body = $( 'body' );
		el_body.css( 'background-color', bgcolors[ Math.floor( ( Math.random() * 8 ) + 1 ) ] );
	}

	function changeNumberColor() {
		var el_number = $( '.number' );
		el_number.css( 'color', reds[ Math.floor( ( Math.random() * 4 ) + 1 ) ] );
	}

	function changeBlueColor() {
		var el_blue = $( '.blueBox' );
		el_blue.css( 'background-color', blues[ Math.floor( Math.random() * blues.length ) ] );
	}

	function changeYellowColor() {
		var el_yellow = $( '.yellowBox' );
		el_yellow.css( 'background-color', yellows[ Math.floor( ( Math.random() * 8 ) + 1 ) ] );
	}

	/**
	 * Get user input
	 *
	 * @type {[type]}
	 */

	/**
	 * On click
	 *
	 * @since  [since]
	 *
	 * @param  {[type]} event
	 *
	 * @return {[type]}       [description]
	 */
	$( 'button' ).on( 'click', function( event ) {

		var userOrOrg = $( 'input.user-or-org' ).val();
		var repoName = $( 'input.repo-name' ).val();

		event.preventDefault();
		console.table( userOrOrg, repoName );

	} );

	/**
	 * Get their Github API v3 feed
	 */

	/**
	 * Github API v3 jsonp is returned in the format of:
	 * https://api.github.com/repos/<user or organization>/<name of repository>/commits?callback=repo
	 * (with the callback value being the jsonp payload)
	 */
	var userOrOrgExample = 'common-gold';
	var repoNameExample = 'musicalChars';
	console.log( 'https://api.github.com/repos/' + userOrOrgExample + '/' + repoNameExample + '/commits?callback=repo' );
	$.ajax( {
		url: 'https://api.github.com/repos/' + userOrOrgExample + '/' + repoNameExample + '/commits?callback=repo',
		dataType: 'jsonp',
		success: function( repo ) {
				// console.log( repo.data );
				console.au( 'Business time.' );
				console.table( repo.data );

				var len = repo.length;
				for ( var i = 0; i < len; i++ ) {

					// '<p>' + title + '</p>'
				}
				$( '.out' ).html( 'wefrwefwf' );


				function repoKey() {
					return 'temp repoKey';
				}

				/**
				 * Parse jsonp and calcuate various arbitrary musical properties, and assign them to the repoMusic object.
				 *
				 * @todo
				 */

				var musicalChars = {
					bpm: function() {
						var calcBPM = 120;
						return calcBPM;
					},
					timeSignature: function() {
						if ( repo.data.commit.message.length > 5 ) {
							return [ 4, 4 ];
						} else if ( repo.data.commit.length > 50 ) {
							return [ 3, 4 ];
						}
					},
					duration: repo.length,
					key: function() {
						switch ( repo.data.commit.message ) {
							case n:
								//
								break;
							case n:
								//
								break;
							default:
								//
						}

					},
					hasDrums: true,
					hasMarimba: true,
					hasBass: true,
					hasFlute: true,
					hasPiano: true,
					hasSquare: true,
					hasSawtooth: true,
					notes: {
						drums: function() {

							return [];
						},
						marimba: function() {

							return [];
						},
						bass: function() {

							return [];
						},
						flute: function() {

							return [];
						},
						piano: function() {

							return [];
						},
						sawtoothwave: function() {

							return [];
						},
						squarewave: function() {

							return [];
						}
					}

				}


				/**
				 * Music
				 *
				 * Now we create music from the repoMusic values, using Tone.js.
				 *
				 * Instruments:
				 *
				 * drums
				 * marimba
				 * bass
				 * flute
				 * piano
				 * squarewave
				 * sawtooth wave
				 *
				 */

				/*
				 * Drums
				 *
				 * Really just a snare.
				 */
				var snare = new Tone.NoiseSynth( {
					"volume": -10,
					"envelope": {
						"attack": 0.001,
						"decay": 0.2,
						"sustain": 0
					},
					"filterEnvelope": {
						"attack": 0.001,
						"decay": 0.1,
						"sustain": 0
					}
				} ).toMaster();


				var snarePart = new Tone.Part( function( time ) {
					snare.triggerAttack( time );
					changeNumberColor();
					changeBlueColor();
					$( '.button' ).toggleClass( 'playing' );
				}, musicalChars.notes.drums ).start( 0 );

				/**
				 *  Marimba
				 */
				var insMarimba = new Tone.PolySynth( 4, Tone.Synth, {
					"volume": -5,
					"oscillator": {
						"partials": [ 1, 0, 2, 0, 3 ],
					},
					"envelope": {
						"attack": 0.001,
						"decay": 1.2,
						"sustain": 0,
						"release": 1.2
					}
				} ).toMaster()

				var insMarimba_part = new Tone.Part( function( time, note ) {

					insMarimba.triggerAttackRelease( note, "8n", time );

				}, musicalChars.notes.marimba ).start();

				/*
				 * Bass
				 */
				var insBass = new Tone.PolySynth( 4, Tone.SimpleFM, {
					"volume": -3,
					"harmonicity": 3.01,
					"modulationIndex": 14,
					"carrier": {
						"oscillator": {
							"type": "sawtooth6"
						},
						"envelope": {
							"attack": 0.01,
							"decay": 0.5,
							"sustain": 0.1,
							"release": 1.2
						}
					},
					"modulator": {
						"oscillator": {
							"type": "triangle"
						},
						"envelope": {
							"attack": 0.01,
							"decay": 0.5,
							"sustain": 0.2,
							"release": 0.1
						}
					}
				} ).toMaster();

				var bassPart = new Tone.Part( function( time, note ) {
					insBass.triggerAttackRelease( note, "4n", time );
					changeBgColor();
				}, musicalChars.notes.bass ).start( 0 );

				/*
				 * Flute
				 */
				var insFlute = new Tone.PolySynth( 4, Tone.SimpleFM, {
					"volume": -3,
					"harmonicity": 3.01,
					"modulationIndex": 14,
					"carrier": {
						"oscillator": {
							"type": "triangle"
						},
						"envelope": {
							"attack": 0.05,
							"decay": 0.5,
							"sustain": 0.1,
							"release": 1.2
						}
					},
					"modulator": {
						"oscillator": {
							"type": "square"
						},
						"envelope": {
							"attack": 0.01,
							"decay": 0.5,
							"sustain": 0.2,
							"release": 0.1
						}
					}
				} ).toMaster();

				var flutePart = new Tone.Part( function( time, note ) {
					insFlute.triggerAttackRelease( note, "4n", time );
					changeYellowColor();
				}, musicalChars.notes.flute ).start( 0 );

				/*
				 * Part 5 - piano
				 */
				var insPiano = new Tone.PolySynth( 2, Tone.Synth, {
					"volume": -8.75,
					"oscillator": {
						"partials": [
			   31,
			   23,
			   3,
			   5,
			   5,
			   1
				]
					},
					"envelope": {
						"attack": 0.001,
						"decay": 1.1,
						"sustain": 0,
						"release": 0.6
					}
				} ).toMaster();

				var pianoPart = new Tone.Part( function( time, note ) {
					insPiano.triggerAttackRelease( note, "1n", time );
				}, musicalChars.notes.piano ).start( 0 );

				/*
				 * Sawtooth wave synth
				 */
				var insSawtoothwave = new Tone.PolySynth( 2, Tone.SimpleFM, {
					"volume": -1,
					"harmonicity": 3.01,
					"modulationIndex": 14,
					"carrier": {
						"oscillator": {
							"type": "sawtooth6"
						},
						"envelope": {
							"attack": 0.01,
							"decay": 0.5,
							"sustain": 0.1,
							"release": 1.2
						}
					},
					"modulator": {
						"oscillator": {
							"type": "triangle"
						},
						"envelope": {
							"attack": 0.01,
							"decay": 0.5,
							"sustain": 0.2,
							"release": 0.1
						}
					}
				} ).toMaster();

				var sawtoothwavePart = new Tone.Part( function( time, note ) {
					insSawtootwaveh.triggerAttackRelease( note, "4n", time );
				}, musicalChars.notes.sawtoothwave ).start( 0 );

				/*
				 * Part 6 - squarewave
				 */
				var insSquarewave = new Tone.PolySynth( 3, Tone.SimpleFM, {
					"volume": -12,
					"harmonicity": 3.01,
					"modulationIndex": 14,
					"carrier": {
						"oscillator": {
							"type": "square"
						},
						"envelope": {
							"attack": 0.05,
							"decay": 0.5,
							"sustain": 0.1,
							"release": 1.2
						}
					},
					"modulator": {
						"oscillator": {
							"type": "square"
						},
						"envelope": {
							"attack": 0.01,
							"decay": 0.5,
							"sustain": 0.2,
							"release": 0.1
						}
					}
				} ).toMaster();

				var squarewavePart = new Tone.Part( function( time, note ) {
					insSquarewave.triggerAttackRelease( note, "4n", time );
				}, musicalChars.notes.squarewave ).start( 0 );

				/**
				 * Queue up Tone.js, set global values from Github repo data.
				 */

				// Set the time signature
				Tone.Transport.timeSignature = [ 4, 4 ];
				//set the transport
				Tone.Transport.bpm.value = 160;
				Tone.Transport.loop = true;

			} // This concludes our ajax
	} )

} );

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
console.au = function() {

  Array.prototype.unshift.call(

    arguments,
    commonAU.debugger() );

  console.log.apply( console, arguments );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbmdvbGQudXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbiggJCApIHtcblxuXHQndXNlIHN0cmljdCdcblxuXHQvKipcblx0ICogQ29sb3IgY2hhbmdlcnNcblx0ICovXG5cblx0dmFyIGJnY29sb3JzID0gW1xuXHRcIiNGM0YzMTVcIixcblx0XCIjQzFGRDMzXCIsXG5cdFwiI0ZGOTkzM1wiLFxuXHRcIiNGQzVBQjhcIixcblx0XCIjMERENUZDXCIsXG5cdFwiZ3JleVwiLFxuXHRcImFxdWFcIixcblx0XCJjb3JuZmxvd2VyXCIsXG5cdFwic2FsbW9uXCIsXG5cdFwib3JhbmdlXCIsXG5cdFwiYmxhY2tcIixcblx0XCJwdXJwbGVcIixcblx0XCJwaW5rXCJcblx0XTtcblxuXHRmdW5jdGlvbiBjaGFuZ2VCZ0NvbG9yKCkge1xuXHRcdHZhciBlbF9ib2R5ID0gJCggJ2JvZHknICk7XG5cdFx0ZWxfYm9keS5jc3MoICdiYWNrZ3JvdW5kLWNvbG9yJywgYmdjb2xvcnNbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VOdW1iZXJDb2xvcigpIHtcblx0XHR2YXIgZWxfbnVtYmVyID0gJCggJy5udW1iZXInICk7XG5cdFx0ZWxfbnVtYmVyLmNzcyggJ2NvbG9yJywgcmVkc1sgTWF0aC5mbG9vciggKCBNYXRoLnJhbmRvbSgpICogNCApICsgMSApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZUJsdWVDb2xvcigpIHtcblx0XHR2YXIgZWxfYmx1ZSA9ICQoICcuYmx1ZUJveCcgKTtcblx0XHRlbF9ibHVlLmNzcyggJ2JhY2tncm91bmQtY29sb3InLCBibHVlc1sgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGJsdWVzLmxlbmd0aCApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVllbGxvd0NvbG9yKCkge1xuXHRcdHZhciBlbF95ZWxsb3cgPSAkKCAnLnllbGxvd0JveCcgKTtcblx0XHRlbF95ZWxsb3cuY3NzKCAnYmFja2dyb3VuZC1jb2xvcicsIHllbGxvd3NbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHVzZXIgaW5wdXRcblx0ICpcblx0ICogQHR5cGUge1t0eXBlXX1cblx0ICovXG5cblx0LyoqXG5cdCAqIE9uIGNsaWNrXG5cdCAqXG5cdCAqIEBzaW5jZSAgW3NpbmNlXVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtbdHlwZV19IGV2ZW50XG5cdCAqXG5cdCAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuXHQgKi9cblx0JCggJ2J1dHRvbicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dmFyIHVzZXJPck9yZyA9ICQoICdpbnB1dC51c2VyLW9yLW9yZycgKS52YWwoKTtcblx0XHR2YXIgcmVwb05hbWUgPSAkKCAnaW5wdXQucmVwby1uYW1lJyApLnZhbCgpO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zb2xlLnRhYmxlKCB1c2VyT3JPcmcsIHJlcG9OYW1lICk7XG5cblx0fSApO1xuXG5cdC8qKlxuXHQgKiBHZXQgdGhlaXIgR2l0aHViIEFQSSB2MyBmZWVkXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBHaXRodWIgQVBJIHYzIGpzb25wIGlzIHJldHVybmVkIGluIHRoZSBmb3JtYXQgb2Y6XG5cdCAqIGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvPHVzZXIgb3Igb3JnYW5pemF0aW9uPi88bmFtZSBvZiByZXBvc2l0b3J5Pi9jb21taXRzP2NhbGxiYWNrPXJlcG9cblx0ICogKHdpdGggdGhlIGNhbGxiYWNrIHZhbHVlIGJlaW5nIHRoZSBqc29ucCBwYXlsb2FkKVxuXHQgKi9cblx0dmFyIHVzZXJPck9yZ0V4YW1wbGUgPSAnY29tbW9uLWdvbGQnO1xuXHR2YXIgcmVwb05hbWVFeGFtcGxlID0gJ211c2ljYWxDaGFycyc7XG5cdGNvbnNvbGUubG9nKCAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8nICsgdXNlck9yT3JnRXhhbXBsZSArICcvJyArIHJlcG9OYW1lRXhhbXBsZSArICcvY29tbWl0cz9jYWxsYmFjaz1yZXBvJyApO1xuXHQkLmFqYXgoIHtcblx0XHR1cmw6ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLycgKyB1c2VyT3JPcmdFeGFtcGxlICsgJy8nICsgcmVwb05hbWVFeGFtcGxlICsgJy9jb21taXRzP2NhbGxiYWNrPXJlcG8nLFxuXHRcdGRhdGFUeXBlOiAnanNvbnAnLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCByZXBvICkge1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyggcmVwby5kYXRhICk7XG5cdFx0XHRcdGNvbnNvbGUuYXUoICdCdXNpbmVzcyB0aW1lLicgKTtcblx0XHRcdFx0Y29uc29sZS50YWJsZSggcmVwby5kYXRhICk7XG5cblx0XHRcdFx0dmFyIGxlbiA9IHJlcG8ubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblxuXHRcdFx0XHRcdC8vICc8cD4nICsgdGl0bGUgKyAnPC9wPidcblx0XHRcdFx0fVxuXHRcdFx0XHQkKCAnLm91dCcgKS5odG1sKCAnd2VmcndlZndmJyApO1xuXG5cblx0XHRcdFx0ZnVuY3Rpb24gcmVwb0tleSgpIHtcblx0XHRcdFx0XHRyZXR1cm4gJ3RlbXAgcmVwb0tleSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogUGFyc2UganNvbnAgYW5kIGNhbGN1YXRlIHZhcmlvdXMgYXJiaXRyYXJ5IG11c2ljYWwgcHJvcGVydGllcywgYW5kIGFzc2lnbiB0aGVtIHRvIHRoZSByZXBvTXVzaWMgb2JqZWN0LlxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBAdG9kb1xuXHRcdFx0XHQgKi9cblxuXHRcdFx0XHR2YXIgbXVzaWNhbENoYXJzID0ge1xuXHRcdFx0XHRcdGJwbTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgY2FsY0JQTSA9IDEyMDtcblx0XHRcdFx0XHRcdHJldHVybiBjYWxjQlBNO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dGltZVNpZ25hdHVyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHJlcG8uZGF0YS5jb21taXQubWVzc2FnZS5sZW5ndGggPiA1ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWyA0LCA0IF07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCByZXBvLmRhdGEuY29tbWl0Lmxlbmd0aCA+IDUwICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWyAzLCA0IF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkdXJhdGlvbjogcmVwby5sZW5ndGgsXG5cdFx0XHRcdFx0a2V5OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHN3aXRjaCAoIHJlcG8uZGF0YS5jb21taXQubWVzc2FnZSApIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSBuOlxuXHRcdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2Ugbjpcblx0XHRcdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGhhc0RydW1zOiB0cnVlLFxuXHRcdFx0XHRcdGhhc01hcmltYmE6IHRydWUsXG5cdFx0XHRcdFx0aGFzQmFzczogdHJ1ZSxcblx0XHRcdFx0XHRoYXNGbHV0ZTogdHJ1ZSxcblx0XHRcdFx0XHRoYXNQaWFubzogdHJ1ZSxcblx0XHRcdFx0XHRoYXNTcXVhcmU6IHRydWUsXG5cdFx0XHRcdFx0aGFzU2F3dG9vdGg6IHRydWUsXG5cdFx0XHRcdFx0bm90ZXM6IHtcblx0XHRcdFx0XHRcdGRydW1zOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0bWFyaW1iYTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGJhc3M6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRmbHV0ZTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHBpYW5vOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c2F3dG9vdGh3YXZlOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3F1YXJld2F2ZTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogTXVzaWNcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogTm93IHdlIGNyZWF0ZSBtdXNpYyBmcm9tIHRoZSByZXBvTXVzaWMgdmFsdWVzLCB1c2luZyBUb25lLmpzLlxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBJbnN0cnVtZW50czpcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogZHJ1bXNcblx0XHRcdFx0ICogbWFyaW1iYVxuXHRcdFx0XHQgKiBiYXNzXG5cdFx0XHRcdCAqIGZsdXRlXG5cdFx0XHRcdCAqIHBpYW5vXG5cdFx0XHRcdCAqIHNxdWFyZXdhdmVcblx0XHRcdFx0ICogc2F3dG9vdGggd2F2ZVxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKi9cblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBEcnVtc1xuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBSZWFsbHkganVzdCBhIHNuYXJlLlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIHNuYXJlID0gbmV3IFRvbmUuTm9pc2VTeW50aCgge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0xMCxcblx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDAxLFxuXHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJmaWx0ZXJFbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC4xLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cblx0XHRcdFx0dmFyIHNuYXJlUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lICkge1xuXHRcdFx0XHRcdHNuYXJlLnRyaWdnZXJBdHRhY2soIHRpbWUgKTtcblx0XHRcdFx0XHRjaGFuZ2VOdW1iZXJDb2xvcigpO1xuXHRcdFx0XHRcdGNoYW5nZUJsdWVDb2xvcigpO1xuXHRcdFx0XHRcdCQoICcuYnV0dG9uJyApLnRvZ2dsZUNsYXNzKCAncGxheWluZycgKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLmRydW1zICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogIE1hcmltYmFcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNNYXJpbWJhID0gbmV3IFRvbmUuUG9seVN5bnRoKCA0LCBUb25lLlN5bnRoLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTUsXG5cdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwicGFydGlhbHNcIjogWyAxLCAwLCAyLCAwLCAzIF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDAxLFxuXHRcdFx0XHRcdFx0XCJkZWNheVwiOiAxLjIsXG5cdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMCxcblx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpXG5cblx0XHRcdFx0dmFyIGluc01hcmltYmFfcGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXG5cdFx0XHRcdFx0aW5zTWFyaW1iYS50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI4blwiLCB0aW1lICk7XG5cblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLm1hcmltYmEgKS5zdGFydCgpO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIEJhc3Ncblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNCYXNzID0gbmV3IFRvbmUuUG9seVN5bnRoKCA0LCBUb25lLlNpbXBsZUZNLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTMsXG5cdFx0XHRcdFx0XCJoYXJtb25pY2l0eVwiOiAzLjAxLFxuXHRcdFx0XHRcdFwibW9kdWxhdGlvbkluZGV4XCI6IDE0LFxuXHRcdFx0XHRcdFwiY2FycmllclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzYXd0b290aDZcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMSxcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJtb2R1bGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwidHJpYW5nbGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMixcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIGJhc3NQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zQmFzcy50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdFx0Y2hhbmdlQmdDb2xvcigpO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMuYmFzcyApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogRmx1dGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNGbHV0ZSA9IG5ldyBUb25lLlBvbHlTeW50aCggNCwgVG9uZS5TaW1wbGVGTSwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0zLFxuXHRcdFx0XHRcdFwiaGFybW9uaWNpdHlcIjogMy4wMSxcblx0XHRcdFx0XHRcIm1vZHVsYXRpb25JbmRleFwiOiAxNCxcblx0XHRcdFx0XHRcImNhcnJpZXJcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwidHJpYW5nbGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjA1LFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMSxcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJtb2R1bGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic3F1YXJlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAwLjFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cdFx0XHRcdHZhciBmbHV0ZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNGbHV0ZS50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdFx0Y2hhbmdlWWVsbG93Q29sb3IoKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLmZsdXRlICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBQYXJ0IDUgLSBwaWFub1xuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIGluc1BpYW5vID0gbmV3IFRvbmUuUG9seVN5bnRoKCAyLCBUb25lLlN5bnRoLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTguNzUsXG5cdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwicGFydGlhbHNcIjogW1xuXHRcdFx0ICAgMzEsXG5cdFx0XHQgICAyMyxcblx0XHRcdCAgIDMsXG5cdFx0XHQgICA1LFxuXHRcdFx0ICAgNSxcblx0XHRcdCAgIDFcblx0XHRcdFx0XVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMS4xLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAsXG5cdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC42XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgcGlhbm9QYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zUGlhbm8udHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiMW5cIiwgdGltZSApO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMucGlhbm8gKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIFNhd3Rvb3RoIHdhdmUgc3ludGhcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNTYXd0b290aHdhdmUgPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDIsIFRvbmUuU2ltcGxlRk0sIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMSxcblx0XHRcdFx0XHRcImhhcm1vbmljaXR5XCI6IDMuMDEsXG5cdFx0XHRcdFx0XCJtb2R1bGF0aW9uSW5kZXhcIjogMTQsXG5cdFx0XHRcdFx0XCJjYXJyaWVyXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNhd3Rvb3RoNlwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4xLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcIm1vZHVsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJ0cmlhbmdsZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4yLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC4xXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgc2F3dG9vdGh3YXZlUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc1Nhd3Rvb3R3YXZlaC50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5zYXd0b290aHdhdmUgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIFBhcnQgNiAtIHNxdWFyZXdhdmVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNTcXVhcmV3YXZlID0gbmV3IFRvbmUuUG9seVN5bnRoKCAzLCBUb25lLlNpbXBsZUZNLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTEyLFxuXHRcdFx0XHRcdFwiaGFybW9uaWNpdHlcIjogMy4wMSxcblx0XHRcdFx0XHRcIm1vZHVsYXRpb25JbmRleFwiOiAxNCxcblx0XHRcdFx0XHRcImNhcnJpZXJcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic3F1YXJlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wNSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwibW9kdWxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNxdWFyZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4yLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC4xXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgc3F1YXJld2F2ZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNTcXVhcmV3YXZlLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjRuXCIsIHRpbWUgKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLnNxdWFyZXdhdmUgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBRdWV1ZSB1cCBUb25lLmpzLCBzZXQgZ2xvYmFsIHZhbHVlcyBmcm9tIEdpdGh1YiByZXBvIGRhdGEuXG5cdFx0XHRcdCAqL1xuXG5cdFx0XHRcdC8vIFNldCB0aGUgdGltZSBzaWduYXR1cmVcblx0XHRcdFx0VG9uZS5UcmFuc3BvcnQudGltZVNpZ25hdHVyZSA9IFsgNCwgNCBdO1xuXHRcdFx0XHQvL3NldCB0aGUgdHJhbnNwb3J0XG5cdFx0XHRcdFRvbmUuVHJhbnNwb3J0LmJwbS52YWx1ZSA9IDE2MDtcblx0XHRcdFx0VG9uZS5UcmFuc3BvcnQubG9vcCA9IHRydWU7XG5cblx0XHRcdH0gLy8gVGhpcyBjb25jbHVkZXMgb3VyIGFqYXhcblx0fSApXG5cbn0gKTtcbiIsIi8qKlxuICogSGVscGZ1bCB1dGlsaXRpZXMgZm9yIHByb2plY3RzXG4gKlxuICogQHR5cGUge09iamVjdH0gY29tbW9uQVUgb2JqZWN0XG4gKi9cbnZhciBjb21tb25BVSA9IHtcbiAgZGVidWdnZXI6IGZ1bmN0aW9uKCBlcnJvck1lc3NhZ2UgKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgcmV0dXJuICdDb21tb24gR29sZDogJyArICdcXG4nICsgZXJyb3JNZXNzYWdlO1xuICAgIGRlYnVnZ2VyO1xuICB9LFxuICBkZWJ1ZzogZmFsc2Vcbn1cblxuLyoqXG4gKiBBIGNvbnNvbGUuZXJyb3IgcHJvdG90eXBlXG4gKlxuICogLSBDYWxsYWJsZSB3aXRoIGBjb25zb2xlLmNvbW1vbkFVKCBcIlRoZSBlcnJvclwiIClgXG4gKlxuICogQHNpbmNlICAwLjFcbiAqXG4gKiBAcmV0dXJuIHtbY29uc29sZS5lcnJvciBvYmplY3RdfSBbRXJyb3Igb2JqZWN0IGFuZCBlcnJvciBtZXNzYWdlIHN0cmluZ11cbiAqL1xuY29uc29sZS5hdSA9IGZ1bmN0aW9uKCkge1xuXG4gIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmNhbGwoXG5cbiAgICBhcmd1bWVudHMsXG4gICAgY29tbW9uQVUuZGVidWdnZXIoKSApO1xuXG4gIGNvbnNvbGUubG9nLmFwcGx5KCBjb25zb2xlLCBhcmd1bWVudHMgKTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
