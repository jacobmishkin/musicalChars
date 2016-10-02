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
	var repoURL = 'https://api.github.com/repos/' + userOrOrgExample + '/' + repoNameExample + '/commits?callback=repo';

	$.ajax( {
		url: repoURL,
		dataType: 'jsonp',
		success: function( repo ) {

				if ( undefined === repo.data || repo.message.indexOf( 'API rate limit exceeded' ) >= 0 ) {
					// Should we add in auth? This is going to get really annoying...
					console.au( 'Aw shit, you hit the Github aunauthenticated API usage rate limit. It should reset in a few minutes.' );
					return;
				}

				console.au( 'Business time.' );
				console.table( repo.data );
				console.au( repo.data[ 0 ].commit.message );
				var len = repo.length;
				for ( var i = 0; i < len; i++ ) {

					// '<p>' + repo.data[0].commit.message + '</p>'
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
					hasSpeech: function() {
						return ( 'speechSynthesis' in window ) ? true : false;
					},
					hasDrums: true,
					hasMarimba: true,
					hasBass: true,
					hasFlute: true,
					hasPiano: true,
					hasSquare: true,
					hasSawtooth: true,
					lyrics: {
						verse1: function() {

							if ( !musicalChars.hasSpeech() ) {
								return false;
								console.error( 'no speech' );
							}

							if ( repo.data[ 0 ].commit.message ) {
								return repo.data[ 0 ].commit.message;
							} else {
								return false;
								console.error( 'no commit message!' );
							}
						}
					},
					vocals: {
						// Plan is to try to match the relative pitch to the key the music is in.
						pitch: .3,
						// Adjust rate based on the bpm value of the song.
						rate: 1
					},
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
					},
					init: function() {

						/**
						 * Start up speech synthesis engine.
						 *
						 * @type {[type]}
						 */
						var voices = speechSynthesis.getVoices();

						// Loop through each of the voices.
						voices.forEach( function( voice, i ) {

							// console.au( voice );

							var voiceName = voice.name;

							// Add the option to the voice selector.
							// voiceSelect.appendChild( option );
						} );
					}

				}

				musicalChars.init();

				// Chrome loads voices asynchronously.
				window.speechSynthesis.onvoiceschanged = function( e ) {
					musicalChars.init();
				};


				// Create a new utterance for the specified text and add it to
				// the queue.
				function speak( text ) {
					// Create a new instance of SpeechSynthesisUtterance.
					var msg = new SpeechSynthesisUtterance();

					// Set the verse.
					msg.text = musicalChars.vocals.verse1;

					// Set the attributes.
					msg.volume = parseFloat( 9 );
					msg.rate = parseFloat( musicalChars.vocals.rate );
					msg.pitch = parseFloat( musicalChars.vocals.pitch );

					// If a voice has been selected, find the voice and set the
					// utterance instance's voice attribute.
					// if ( voiceSelect.value ) {
					// 	verse.voice = speechSynthesis.getVoices().filter( function( voice ) {
					// 		return voice.name == voiceSelect.value;
					// 	} )[ 0 ];
					// }

					// Queue this utterance.
					window.speechSynthesis.speak( msg );
				}

				/**
				 * Vocals
				 *
				 * Just the example is presently defined.
				 */
				speak( musicalChars.lyrics.verse1() );

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbmdvbGQudXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbGdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbiggJCApIHtcblxuXHQndXNlIHN0cmljdCdcblxuXHQvKipcblx0ICogQ29sb3IgY2hhbmdlcnNcblx0ICovXG5cblx0dmFyIGJnY29sb3JzID0gW1xuXHRcIiNGM0YzMTVcIixcblx0XCIjQzFGRDMzXCIsXG5cdFwiI0ZGOTkzM1wiLFxuXHRcIiNGQzVBQjhcIixcblx0XCIjMERENUZDXCIsXG5cdFwiZ3JleVwiLFxuXHRcImFxdWFcIixcblx0XCJjb3JuZmxvd2VyXCIsXG5cdFwic2FsbW9uXCIsXG5cdFwib3JhbmdlXCIsXG5cdFwiYmxhY2tcIixcblx0XCJwdXJwbGVcIixcblx0XCJwaW5rXCJcblx0XTtcblxuXHRmdW5jdGlvbiBjaGFuZ2VCZ0NvbG9yKCkge1xuXHRcdHZhciBlbF9ib2R5ID0gJCggJ2JvZHknICk7XG5cdFx0ZWxfYm9keS5jc3MoICdiYWNrZ3JvdW5kLWNvbG9yJywgYmdjb2xvcnNbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VOdW1iZXJDb2xvcigpIHtcblx0XHR2YXIgZWxfbnVtYmVyID0gJCggJy5udW1iZXInICk7XG5cdFx0ZWxfbnVtYmVyLmNzcyggJ2NvbG9yJywgcmVkc1sgTWF0aC5mbG9vciggKCBNYXRoLnJhbmRvbSgpICogNCApICsgMSApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZUJsdWVDb2xvcigpIHtcblx0XHR2YXIgZWxfYmx1ZSA9ICQoICcuYmx1ZUJveCcgKTtcblx0XHRlbF9ibHVlLmNzcyggJ2JhY2tncm91bmQtY29sb3InLCBibHVlc1sgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGJsdWVzLmxlbmd0aCApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVllbGxvd0NvbG9yKCkge1xuXHRcdHZhciBlbF95ZWxsb3cgPSAkKCAnLnllbGxvd0JveCcgKTtcblx0XHRlbF95ZWxsb3cuY3NzKCAnYmFja2dyb3VuZC1jb2xvcicsIHllbGxvd3NbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHVzZXIgaW5wdXRcblx0ICpcblx0ICogQHR5cGUge1t0eXBlXX1cblx0ICovXG5cblx0LyoqXG5cdCAqIE9uIGNsaWNrXG5cdCAqXG5cdCAqIEBzaW5jZSAgW3NpbmNlXVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtbdHlwZV19IGV2ZW50XG5cdCAqXG5cdCAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuXHQgKi9cblx0JCggJ2J1dHRvbicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dmFyIHVzZXJPck9yZyA9ICQoICdpbnB1dC51c2VyLW9yLW9yZycgKS52YWwoKTtcblx0XHR2YXIgcmVwb05hbWUgPSAkKCAnaW5wdXQucmVwby1uYW1lJyApLnZhbCgpO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zb2xlLnRhYmxlKCB1c2VyT3JPcmcsIHJlcG9OYW1lICk7XG5cblx0fSApO1xuXG5cdC8qKlxuXHQgKiBHZXQgdGhlaXIgR2l0aHViIEFQSSB2MyBmZWVkXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBHaXRodWIgQVBJIHYzIGpzb25wIGlzIHJldHVybmVkIGluIHRoZSBmb3JtYXQgb2Y6XG5cdCAqIGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvPHVzZXIgb3Igb3JnYW5pemF0aW9uPi88bmFtZSBvZiByZXBvc2l0b3J5Pi9jb21taXRzP2NhbGxiYWNrPXJlcG9cblx0ICogKHdpdGggdGhlIGNhbGxiYWNrIHZhbHVlIGJlaW5nIHRoZSBqc29ucCBwYXlsb2FkKVxuXHQgKi9cblx0dmFyIHVzZXJPck9yZ0V4YW1wbGUgPSAnY29tbW9uLWdvbGQnO1xuXHR2YXIgcmVwb05hbWVFeGFtcGxlID0gJ211c2ljYWxDaGFycyc7XG5cdHZhciByZXBvVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJyArIHVzZXJPck9yZ0V4YW1wbGUgKyAnLycgKyByZXBvTmFtZUV4YW1wbGUgKyAnL2NvbW1pdHM/Y2FsbGJhY2s9cmVwbyc7XG5cblx0JC5hamF4KCB7XG5cdFx0dXJsOiByZXBvVVJMLFxuXHRcdGRhdGFUeXBlOiAnanNvbnAnLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCByZXBvICkge1xuXG5cdFx0XHRcdGlmICggdW5kZWZpbmVkID09PSByZXBvLmRhdGEgfHwgcmVwby5tZXNzYWdlLmluZGV4T2YoICdBUEkgcmF0ZSBsaW1pdCBleGNlZWRlZCcgKSA+PSAwICkge1xuXHRcdFx0XHRcdC8vIFNob3VsZCB3ZSBhZGQgaW4gYXV0aD8gVGhpcyBpcyBnb2luZyB0byBnZXQgcmVhbGx5IGFubm95aW5nLi4uXG5cdFx0XHRcdFx0Y29uc29sZS5hdSggJ0F3IHNoaXQsIHlvdSBoaXQgdGhlIEdpdGh1YiBhdW5hdXRoZW50aWNhdGVkIEFQSSB1c2FnZSByYXRlIGxpbWl0LiBJdCBzaG91bGQgcmVzZXQgaW4gYSBmZXcgbWludXRlcy4nICk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc29sZS5hdSggJ0J1c2luZXNzIHRpbWUuJyApO1xuXHRcdFx0XHRjb25zb2xlLnRhYmxlKCByZXBvLmRhdGEgKTtcblx0XHRcdFx0Y29uc29sZS5hdSggcmVwby5kYXRhWyAwIF0uY29tbWl0Lm1lc3NhZ2UgKTtcblx0XHRcdFx0dmFyIGxlbiA9IHJlcG8ubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblxuXHRcdFx0XHRcdC8vICc8cD4nICsgcmVwby5kYXRhWzBdLmNvbW1pdC5tZXNzYWdlICsgJzwvcD4nXG5cdFx0XHRcdH1cblx0XHRcdFx0JCggJy5vdXQnICkuaHRtbCggJ3dlZnJ3ZWZ3ZicgKTtcblxuXG5cdFx0XHRcdGZ1bmN0aW9uIHJlcG9LZXkoKSB7XG5cdFx0XHRcdFx0cmV0dXJuICd0ZW1wIHJlcG9LZXknO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFBhcnNlIGpzb25wIGFuZCBjYWxjdWF0ZSB2YXJpb3VzIGFyYml0cmFyeSBtdXNpY2FsIHByb3BlcnRpZXMsIGFuZCBhc3NpZ24gdGhlbSB0byB0aGUgcmVwb011c2ljIG9iamVjdC5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogQHRvZG9cblx0XHRcdFx0ICovXG5cblx0XHRcdFx0dmFyIG11c2ljYWxDaGFycyA9IHtcblx0XHRcdFx0XHRicG06IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGNhbGNCUE0gPSAxMjA7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2FsY0JQTTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRpbWVTaWduYXR1cmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCByZXBvLmRhdGEuY29tbWl0Lm1lc3NhZ2UubGVuZ3RoID4gNSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgNCwgNCBdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggcmVwby5kYXRhLmNvbW1pdC5sZW5ndGggPiA1MCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgMywgNCBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZHVyYXRpb246IHJlcG8ubGVuZ3RoLFxuXHRcdFx0XHRcdGtleTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKCByZXBvLmRhdGEuY29tbWl0Lm1lc3NhZ2UgKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2Ugbjpcblx0XHRcdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIG46XG5cdFx0XHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aGFzU3BlZWNoOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoICdzcGVlY2hTeW50aGVzaXMnIGluIHdpbmRvdyApID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aGFzRHJ1bXM6IHRydWUsXG5cdFx0XHRcdFx0aGFzTWFyaW1iYTogdHJ1ZSxcblx0XHRcdFx0XHRoYXNCYXNzOiB0cnVlLFxuXHRcdFx0XHRcdGhhc0ZsdXRlOiB0cnVlLFxuXHRcdFx0XHRcdGhhc1BpYW5vOiB0cnVlLFxuXHRcdFx0XHRcdGhhc1NxdWFyZTogdHJ1ZSxcblx0XHRcdFx0XHRoYXNTYXd0b290aDogdHJ1ZSxcblx0XHRcdFx0XHRseXJpY3M6IHtcblx0XHRcdFx0XHRcdHZlcnNlMTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCAhbXVzaWNhbENoYXJzLmhhc1NwZWVjaCgpICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCAnbm8gc3BlZWNoJyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKCByZXBvLmRhdGFbIDAgXS5jb21taXQubWVzc2FnZSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVwby5kYXRhWyAwIF0uY29tbWl0Lm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdubyBjb21taXQgbWVzc2FnZSEnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHZvY2Fsczoge1xuXHRcdFx0XHRcdFx0Ly8gUGxhbiBpcyB0byB0cnkgdG8gbWF0Y2ggdGhlIHJlbGF0aXZlIHBpdGNoIHRvIHRoZSBrZXkgdGhlIG11c2ljIGlzIGluLlxuXHRcdFx0XHRcdFx0cGl0Y2g6IC4zLFxuXHRcdFx0XHRcdFx0Ly8gQWRqdXN0IHJhdGUgYmFzZWQgb24gdGhlIGJwbSB2YWx1ZSBvZiB0aGUgc29uZy5cblx0XHRcdFx0XHRcdHJhdGU6IDFcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG5vdGVzOiB7XG5cdFx0XHRcdFx0XHRkcnVtczogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdG1hcmltYmE6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRiYXNzOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Zmx1dGU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRwaWFubzogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHNhd3Rvb3Rod2F2ZTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHNxdWFyZXdhdmU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdCAqIFN0YXJ0IHVwIHNwZWVjaCBzeW50aGVzaXMgZW5naW5lLlxuXHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdCAqIEB0eXBlIHtbdHlwZV19XG5cdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdHZhciB2b2ljZXMgPSBzcGVlY2hTeW50aGVzaXMuZ2V0Vm9pY2VzKCk7XG5cblx0XHRcdFx0XHRcdC8vIExvb3AgdGhyb3VnaCBlYWNoIG9mIHRoZSB2b2ljZXMuXG5cdFx0XHRcdFx0XHR2b2ljZXMuZm9yRWFjaCggZnVuY3Rpb24oIHZvaWNlLCBpICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIGNvbnNvbGUuYXUoIHZvaWNlICk7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHZvaWNlTmFtZSA9IHZvaWNlLm5hbWU7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQWRkIHRoZSBvcHRpb24gdG8gdGhlIHZvaWNlIHNlbGVjdG9yLlxuXHRcdFx0XHRcdFx0XHQvLyB2b2ljZVNlbGVjdC5hcHBlbmRDaGlsZCggb3B0aW9uICk7XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRtdXNpY2FsQ2hhcnMuaW5pdCgpO1xuXG5cdFx0XHRcdC8vIENocm9tZSBsb2FkcyB2b2ljZXMgYXN5bmNocm9ub3VzbHkuXG5cdFx0XHRcdHdpbmRvdy5zcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkID0gZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdFx0bXVzaWNhbENoYXJzLmluaXQoKTtcblx0XHRcdFx0fTtcblxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyB1dHRlcmFuY2UgZm9yIHRoZSBzcGVjaWZpZWQgdGV4dCBhbmQgYWRkIGl0IHRvXG5cdFx0XHRcdC8vIHRoZSBxdWV1ZS5cblx0XHRcdFx0ZnVuY3Rpb24gc3BlYWsoIHRleHQgKSB7XG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZS5cblx0XHRcdFx0XHR2YXIgbXNnID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpO1xuXG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSB2ZXJzZS5cblx0XHRcdFx0XHRtc2cudGV4dCA9IG11c2ljYWxDaGFycy52b2NhbHMudmVyc2UxO1xuXG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSBhdHRyaWJ1dGVzLlxuXHRcdFx0XHRcdG1zZy52b2x1bWUgPSBwYXJzZUZsb2F0KCA5ICk7XG5cdFx0XHRcdFx0bXNnLnJhdGUgPSBwYXJzZUZsb2F0KCBtdXNpY2FsQ2hhcnMudm9jYWxzLnJhdGUgKTtcblx0XHRcdFx0XHRtc2cucGl0Y2ggPSBwYXJzZUZsb2F0KCBtdXNpY2FsQ2hhcnMudm9jYWxzLnBpdGNoICk7XG5cblx0XHRcdFx0XHQvLyBJZiBhIHZvaWNlIGhhcyBiZWVuIHNlbGVjdGVkLCBmaW5kIHRoZSB2b2ljZSBhbmQgc2V0IHRoZVxuXHRcdFx0XHRcdC8vIHV0dGVyYW5jZSBpbnN0YW5jZSdzIHZvaWNlIGF0dHJpYnV0ZS5cblx0XHRcdFx0XHQvLyBpZiAoIHZvaWNlU2VsZWN0LnZhbHVlICkge1xuXHRcdFx0XHRcdC8vIFx0dmVyc2Uudm9pY2UgPSBzcGVlY2hTeW50aGVzaXMuZ2V0Vm9pY2VzKCkuZmlsdGVyKCBmdW5jdGlvbiggdm9pY2UgKSB7XG5cdFx0XHRcdFx0Ly8gXHRcdHJldHVybiB2b2ljZS5uYW1lID09IHZvaWNlU2VsZWN0LnZhbHVlO1xuXHRcdFx0XHRcdC8vIFx0fSApWyAwIF07XG5cdFx0XHRcdFx0Ly8gfVxuXG5cdFx0XHRcdFx0Ly8gUXVldWUgdGhpcyB1dHRlcmFuY2UuXG5cdFx0XHRcdFx0d2luZG93LnNwZWVjaFN5bnRoZXNpcy5zcGVhayggbXNnICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogVm9jYWxzXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIEp1c3QgdGhlIGV4YW1wbGUgaXMgcHJlc2VudGx5IGRlZmluZWQuXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRzcGVhayggbXVzaWNhbENoYXJzLmx5cmljcy52ZXJzZTEoKSApO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBNdXNpY1xuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBOb3cgd2UgY3JlYXRlIG11c2ljIGZyb20gdGhlIHJlcG9NdXNpYyB2YWx1ZXMsIHVzaW5nIFRvbmUuanMuXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIEluc3RydW1lbnRzOlxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBkcnVtc1xuXHRcdFx0XHQgKiBtYXJpbWJhXG5cdFx0XHRcdCAqIGJhc3Ncblx0XHRcdFx0ICogZmx1dGVcblx0XHRcdFx0ICogcGlhbm9cblx0XHRcdFx0ICogc3F1YXJld2F2ZVxuXHRcdFx0XHQgKiBzYXd0b290aCB3YXZlXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqL1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIERydW1zXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIFJlYWxseSBqdXN0IGEgc25hcmUuXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgc25hcmUgPSBuZXcgVG9uZS5Ob2lzZVN5bnRoKCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTEwLFxuXHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMDEsXG5cdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuMixcblx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImZpbHRlckVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDAxLFxuXHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblxuXHRcdFx0XHR2YXIgc25hcmVQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUgKSB7XG5cdFx0XHRcdFx0c25hcmUudHJpZ2dlckF0dGFjayggdGltZSApO1xuXHRcdFx0XHRcdGNoYW5nZU51bWJlckNvbG9yKCk7XG5cdFx0XHRcdFx0Y2hhbmdlQmx1ZUNvbG9yKCk7XG5cdFx0XHRcdFx0JCggJy5idXR0b24nICkudG9nZ2xlQ2xhc3MoICdwbGF5aW5nJyApO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMuZHJ1bXMgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiAgTWFyaW1iYVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIGluc01hcmltYmEgPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDQsIFRvbmUuU3ludGgsIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtNSxcblx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJwYXJ0aWFsc1wiOiBbIDEsIDAsIDIsIDAsIDMgXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMDEsXG5cdFx0XHRcdFx0XHRcImRlY2F5XCI6IDEuMixcblx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLFxuXHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKClcblxuXHRcdFx0XHR2YXIgaW5zTWFyaW1iYV9wYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cblx0XHRcdFx0XHRpbnNNYXJpbWJhLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjhuXCIsIHRpbWUgKTtcblxuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMubWFyaW1iYSApLnN0YXJ0KCk7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogQmFzc1xuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIGluc0Jhc3MgPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDQsIFRvbmUuU2ltcGxlRk0sIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMyxcblx0XHRcdFx0XHRcImhhcm1vbmljaXR5XCI6IDMuMDEsXG5cdFx0XHRcdFx0XCJtb2R1bGF0aW9uSW5kZXhcIjogMTQsXG5cdFx0XHRcdFx0XCJjYXJyaWVyXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNhd3Rvb3RoNlwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4xLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcIm1vZHVsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJ0cmlhbmdsZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4yLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC4xXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgYmFzc1BhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNCYXNzLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjRuXCIsIHRpbWUgKTtcblx0XHRcdFx0XHRjaGFuZ2VCZ0NvbG9yKCk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5iYXNzICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBGbHV0ZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIGluc0ZsdXRlID0gbmV3IFRvbmUuUG9seVN5bnRoKCA0LCBUb25lLlNpbXBsZUZNLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTMsXG5cdFx0XHRcdFx0XCJoYXJtb25pY2l0eVwiOiAzLjAxLFxuXHRcdFx0XHRcdFwibW9kdWxhdGlvbkluZGV4XCI6IDE0LFxuXHRcdFx0XHRcdFwiY2FycmllclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJ0cmlhbmdsZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDUsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4xLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcIm1vZHVsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzcXVhcmVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMixcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIGZsdXRlUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc0ZsdXRlLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjRuXCIsIHRpbWUgKTtcblx0XHRcdFx0XHRjaGFuZ2VZZWxsb3dDb2xvcigpO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMuZmx1dGUgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIFBhcnQgNSAtIHBpYW5vXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zUGlhbm8gPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDIsIFRvbmUuU3ludGgsIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtOC43NSxcblx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJwYXJ0aWFsc1wiOiBbXG5cdFx0XHQgICAzMSxcblx0XHRcdCAgIDIzLFxuXHRcdFx0ICAgMyxcblx0XHRcdCAgIDUsXG5cdFx0XHQgICA1LFxuXHRcdFx0ICAgMVxuXHRcdFx0XHRdXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDAxLFxuXHRcdFx0XHRcdFx0XCJkZWNheVwiOiAxLjEsXG5cdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMCxcblx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAwLjZcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cdFx0XHRcdHZhciBwaWFub1BhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNQaWFuby50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCIxblwiLCB0aW1lICk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5waWFubyApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogU2F3dG9vdGggd2F2ZSBzeW50aFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIGluc1Nhd3Rvb3Rod2F2ZSA9IG5ldyBUb25lLlBvbHlTeW50aCggMiwgVG9uZS5TaW1wbGVGTSwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0xLFxuXHRcdFx0XHRcdFwiaGFybW9uaWNpdHlcIjogMy4wMSxcblx0XHRcdFx0XHRcIm1vZHVsYXRpb25JbmRleFwiOiAxNCxcblx0XHRcdFx0XHRcImNhcnJpZXJcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic2F3dG9vdGg2XCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwibW9kdWxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInRyaWFuZ2xlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAwLjFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cdFx0XHRcdHZhciBzYXd0b290aHdhdmVQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zU2F3dG9vdHdhdmVoLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjRuXCIsIHRpbWUgKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLnNhd3Rvb3Rod2F2ZSApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogUGFydCA2IC0gc3F1YXJld2F2ZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIGluc1NxdWFyZXdhdmUgPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDMsIFRvbmUuU2ltcGxlRk0sIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMTIsXG5cdFx0XHRcdFx0XCJoYXJtb25pY2l0eVwiOiAzLjAxLFxuXHRcdFx0XHRcdFwibW9kdWxhdGlvbkluZGV4XCI6IDE0LFxuXHRcdFx0XHRcdFwiY2FycmllclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzcXVhcmVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjA1LFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMSxcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJtb2R1bGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic3F1YXJlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAwLjFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cdFx0XHRcdHZhciBzcXVhcmV3YXZlUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc1NxdWFyZXdhdmUudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiNG5cIiwgdGltZSApO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMuc3F1YXJld2F2ZSApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFF1ZXVlIHVwIFRvbmUuanMsIHNldCBnbG9iYWwgdmFsdWVzIGZyb20gR2l0aHViIHJlcG8gZGF0YS5cblx0XHRcdFx0ICovXG5cblx0XHRcdFx0Ly8gU2V0IHRoZSB0aW1lIHNpZ25hdHVyZVxuXHRcdFx0XHRUb25lLlRyYW5zcG9ydC50aW1lU2lnbmF0dXJlID0gWyA0LCA0IF07XG5cdFx0XHRcdC8vc2V0IHRoZSB0cmFuc3BvcnRcblx0XHRcdFx0VG9uZS5UcmFuc3BvcnQuYnBtLnZhbHVlID0gMTYwO1xuXHRcdFx0XHRUb25lLlRyYW5zcG9ydC5sb29wID0gdHJ1ZTtcblxuXHRcdFx0fSAvLyBUaGlzIGNvbmNsdWRlcyBvdXIgYWpheFxuXHR9IClcblxufSApO1xuIiwiLyoqXG4gKiBIZWxwZnVsIHV0aWxpdGllcyBmb3IgcHJvamVjdHNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fSBjb21tb25BVSBvYmplY3RcbiAqL1xudmFyIGNvbW1vbkFVID0ge1xuICBkZWJ1Z2dlcjogZnVuY3Rpb24oIGVycm9yTWVzc2FnZSApIHtcbiAgICBlcnJvck1lc3NhZ2UgPSAnJztcbiAgICByZXR1cm4gJ0NvbW1vbiBHb2xkOiAnICsgJ1xcbicgKyBlcnJvck1lc3NhZ2U7XG4gICAgZGVidWdnZXI7XG4gIH0sXG4gIGRlYnVnOiBmYWxzZVxufVxuXG4vKipcbiAqIEEgY29uc29sZS5lcnJvciBwcm90b3R5cGVcbiAqXG4gKiAtIENhbGxhYmxlIHdpdGggYGNvbnNvbGUuY29tbW9uQVUoIFwiVGhlIGVycm9yXCIgKWBcbiAqXG4gKiBAc2luY2UgIDAuMVxuICpcbiAqIEByZXR1cm4ge1tjb25zb2xlLmVycm9yIG9iamVjdF19IFtFcnJvciBvYmplY3QgYW5kIGVycm9yIG1lc3NhZ2Ugc3RyaW5nXVxuICovXG5jb25zb2xlLmF1ID0gZnVuY3Rpb24oKSB7XG5cbiAgQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuY2FsbChcblxuICAgIGFyZ3VtZW50cyxcbiAgICBjb21tb25BVS5kZWJ1Z2dlcigpICk7XG5cbiAgY29uc29sZS5sb2cuYXBwbHkoIGNvbnNvbGUsIGFyZ3VtZW50cyApO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
