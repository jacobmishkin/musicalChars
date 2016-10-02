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

				if ( repo.message.indexOf( 'API rate limit exceeded' ) >= 0 ) {
					// Should we add in auth? This is going to get really annoying...
					console.au( 'Aw shit, you hit the Github aunauthenticated API usage rate limit. It should reset in a few minutes.' );
					return;
				}

				console.au( 'Business time.' );
				console.table( repo.data );
				console.au( repo.data[ 0 ].commit.message );
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbmdvbGQudXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbGdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbiggJCApIHtcblxuXHQndXNlIHN0cmljdCdcblxuXHQvKipcblx0ICogQ29sb3IgY2hhbmdlcnNcblx0ICovXG5cblx0dmFyIGJnY29sb3JzID0gW1xuXHRcIiNGM0YzMTVcIixcblx0XCIjQzFGRDMzXCIsXG5cdFwiI0ZGOTkzM1wiLFxuXHRcIiNGQzVBQjhcIixcblx0XCIjMERENUZDXCIsXG5cdFwiZ3JleVwiLFxuXHRcImFxdWFcIixcblx0XCJjb3JuZmxvd2VyXCIsXG5cdFwic2FsbW9uXCIsXG5cdFwib3JhbmdlXCIsXG5cdFwiYmxhY2tcIixcblx0XCJwdXJwbGVcIixcblx0XCJwaW5rXCJcblx0XTtcblxuXHRmdW5jdGlvbiBjaGFuZ2VCZ0NvbG9yKCkge1xuXHRcdHZhciBlbF9ib2R5ID0gJCggJ2JvZHknICk7XG5cdFx0ZWxfYm9keS5jc3MoICdiYWNrZ3JvdW5kLWNvbG9yJywgYmdjb2xvcnNbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VOdW1iZXJDb2xvcigpIHtcblx0XHR2YXIgZWxfbnVtYmVyID0gJCggJy5udW1iZXInICk7XG5cdFx0ZWxfbnVtYmVyLmNzcyggJ2NvbG9yJywgcmVkc1sgTWF0aC5mbG9vciggKCBNYXRoLnJhbmRvbSgpICogNCApICsgMSApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZUJsdWVDb2xvcigpIHtcblx0XHR2YXIgZWxfYmx1ZSA9ICQoICcuYmx1ZUJveCcgKTtcblx0XHRlbF9ibHVlLmNzcyggJ2JhY2tncm91bmQtY29sb3InLCBibHVlc1sgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGJsdWVzLmxlbmd0aCApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVllbGxvd0NvbG9yKCkge1xuXHRcdHZhciBlbF95ZWxsb3cgPSAkKCAnLnllbGxvd0JveCcgKTtcblx0XHRlbF95ZWxsb3cuY3NzKCAnYmFja2dyb3VuZC1jb2xvcicsIHllbGxvd3NbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHVzZXIgaW5wdXRcblx0ICpcblx0ICogQHR5cGUge1t0eXBlXX1cblx0ICovXG5cblx0LyoqXG5cdCAqIE9uIGNsaWNrXG5cdCAqXG5cdCAqIEBzaW5jZSAgW3NpbmNlXVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtbdHlwZV19IGV2ZW50XG5cdCAqXG5cdCAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuXHQgKi9cblx0JCggJ2J1dHRvbicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dmFyIHVzZXJPck9yZyA9ICQoICdpbnB1dC51c2VyLW9yLW9yZycgKS52YWwoKTtcblx0XHR2YXIgcmVwb05hbWUgPSAkKCAnaW5wdXQucmVwby1uYW1lJyApLnZhbCgpO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zb2xlLnRhYmxlKCB1c2VyT3JPcmcsIHJlcG9OYW1lICk7XG5cblx0fSApO1xuXG5cdC8qKlxuXHQgKiBHZXQgdGhlaXIgR2l0aHViIEFQSSB2MyBmZWVkXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBHaXRodWIgQVBJIHYzIGpzb25wIGlzIHJldHVybmVkIGluIHRoZSBmb3JtYXQgb2Y6XG5cdCAqIGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvPHVzZXIgb3Igb3JnYW5pemF0aW9uPi88bmFtZSBvZiByZXBvc2l0b3J5Pi9jb21taXRzP2NhbGxiYWNrPXJlcG9cblx0ICogKHdpdGggdGhlIGNhbGxiYWNrIHZhbHVlIGJlaW5nIHRoZSBqc29ucCBwYXlsb2FkKVxuXHQgKi9cblx0dmFyIHVzZXJPck9yZ0V4YW1wbGUgPSAnY29tbW9uLWdvbGQnO1xuXHR2YXIgcmVwb05hbWVFeGFtcGxlID0gJ211c2ljYWxDaGFycyc7XG5cdHZhciByZXBvVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJyArIHVzZXJPck9yZ0V4YW1wbGUgKyAnLycgKyByZXBvTmFtZUV4YW1wbGUgKyAnL2NvbW1pdHM/Y2FsbGJhY2s9cmVwbyc7XG5cblx0JC5hamF4KCB7XG5cdFx0dXJsOiByZXBvVVJMLFxuXHRcdGRhdGFUeXBlOiAnanNvbnAnLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCByZXBvICkge1xuXG5cdFx0XHRcdGlmICggcmVwby5tZXNzYWdlLmluZGV4T2YoICdBUEkgcmF0ZSBsaW1pdCBleGNlZWRlZCcgKSA+PSAwICkge1xuXHRcdFx0XHRcdC8vIFNob3VsZCB3ZSBhZGQgaW4gYXV0aD8gVGhpcyBpcyBnb2luZyB0byBnZXQgcmVhbGx5IGFubm95aW5nLi4uXG5cdFx0XHRcdFx0Y29uc29sZS5hdSggJ0F3IHNoaXQsIHlvdSBoaXQgdGhlIEdpdGh1YiBhdW5hdXRoZW50aWNhdGVkIEFQSSB1c2FnZSByYXRlIGxpbWl0LiBJdCBzaG91bGQgcmVzZXQgaW4gYSBmZXcgbWludXRlcy4nICk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc29sZS5hdSggJ0J1c2luZXNzIHRpbWUuJyApO1xuXHRcdFx0XHRjb25zb2xlLnRhYmxlKCByZXBvLmRhdGEgKTtcblx0XHRcdFx0Y29uc29sZS5hdSggcmVwby5kYXRhWyAwIF0uY29tbWl0Lm1lc3NhZ2UgKTtcblx0XHRcdFx0dmFyIGxlbiA9IHJlcG8ubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblxuXHRcdFx0XHRcdC8vICc8cD4nICsgdGl0bGUgKyAnPC9wPidcblx0XHRcdFx0fVxuXHRcdFx0XHQkKCAnLm91dCcgKS5odG1sKCAnd2VmcndlZndmJyApO1xuXG5cblx0XHRcdFx0ZnVuY3Rpb24gcmVwb0tleSgpIHtcblx0XHRcdFx0XHRyZXR1cm4gJ3RlbXAgcmVwb0tleSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogUGFyc2UganNvbnAgYW5kIGNhbGN1YXRlIHZhcmlvdXMgYXJiaXRyYXJ5IG11c2ljYWwgcHJvcGVydGllcywgYW5kIGFzc2lnbiB0aGVtIHRvIHRoZSByZXBvTXVzaWMgb2JqZWN0LlxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBAdG9kb1xuXHRcdFx0XHQgKi9cblxuXHRcdFx0XHR2YXIgbXVzaWNhbENoYXJzID0ge1xuXHRcdFx0XHRcdGJwbTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgY2FsY0JQTSA9IDEyMDtcblx0XHRcdFx0XHRcdHJldHVybiBjYWxjQlBNO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dGltZVNpZ25hdHVyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHJlcG8uZGF0YS5jb21taXQubWVzc2FnZS5sZW5ndGggPiA1ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWyA0LCA0IF07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCByZXBvLmRhdGEuY29tbWl0Lmxlbmd0aCA+IDUwICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWyAzLCA0IF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkdXJhdGlvbjogcmVwby5sZW5ndGgsXG5cdFx0XHRcdFx0a2V5OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHN3aXRjaCAoIHJlcG8uZGF0YS5jb21taXQubWVzc2FnZSApIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSBuOlxuXHRcdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2Ugbjpcblx0XHRcdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRoYXNTcGVlY2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICggJ3NwZWVjaFN5bnRoZXNpcycgaW4gd2luZG93ICkgPyB0cnVlIDogZmFsc2U7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRoYXNEcnVtczogdHJ1ZSxcblx0XHRcdFx0XHRoYXNNYXJpbWJhOiB0cnVlLFxuXHRcdFx0XHRcdGhhc0Jhc3M6IHRydWUsXG5cdFx0XHRcdFx0aGFzRmx1dGU6IHRydWUsXG5cdFx0XHRcdFx0aGFzUGlhbm86IHRydWUsXG5cdFx0XHRcdFx0aGFzU3F1YXJlOiB0cnVlLFxuXHRcdFx0XHRcdGhhc1Nhd3Rvb3RoOiB0cnVlLFxuXHRcdFx0XHRcdGx5cmljczoge1xuXHRcdFx0XHRcdFx0dmVyc2UxOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoICFtdXNpY2FsQ2hhcnMuaGFzU3BlZWNoKCkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdubyBzcGVlY2gnICk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoIHJlcG8uZGF0YVsgMCBdLmNvbW1pdC5tZXNzYWdlICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXBvLmRhdGFbIDAgXS5jb21taXQubWVzc2FnZTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvciggJ25vIGNvbW1pdCBtZXNzYWdlIScgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dm9jYWxzOiB7XG5cdFx0XHRcdFx0XHQvLyBQbGFuIGlzIHRvIHRyeSB0byBtYXRjaCB0aGUgcmVsYXRpdmUgcGl0Y2ggdG8gdGhlIGtleSB0aGUgbXVzaWMgaXMgaW4uXG5cdFx0XHRcdFx0XHRwaXRjaDogLjMsXG5cdFx0XHRcdFx0XHQvLyBBZGp1c3QgcmF0ZSBiYXNlZCBvbiB0aGUgYnBtIHZhbHVlIG9mIHRoZSBzb25nLlxuXHRcdFx0XHRcdFx0cmF0ZTogMVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bm90ZXM6IHtcblx0XHRcdFx0XHRcdGRydW1zOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0bWFyaW1iYTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGJhc3M6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRmbHV0ZTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHBpYW5vOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c2F3dG9vdGh3YXZlOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3F1YXJld2F2ZTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0ICogU3RhcnQgdXAgc3BlZWNoIHN5bnRoZXNpcyBlbmdpbmUuXG5cdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0ICogQHR5cGUge1t0eXBlXX1cblx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0dmFyIHZvaWNlcyA9IHNwZWVjaFN5bnRoZXNpcy5nZXRWb2ljZXMoKTtcblxuXHRcdFx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggb2YgdGhlIHZvaWNlcy5cblx0XHRcdFx0XHRcdHZvaWNlcy5mb3JFYWNoKCBmdW5jdGlvbiggdm9pY2UsIGkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gY29uc29sZS5hdSggdm9pY2UgKTtcblxuXHRcdFx0XHRcdFx0XHR2YXIgdm9pY2VOYW1lID0gdm9pY2UubmFtZTtcblxuXHRcdFx0XHRcdFx0XHQvLyBBZGQgdGhlIG9wdGlvbiB0byB0aGUgdm9pY2Ugc2VsZWN0b3IuXG5cdFx0XHRcdFx0XHRcdC8vIHZvaWNlU2VsZWN0LmFwcGVuZENoaWxkKCBvcHRpb24gKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdG11c2ljYWxDaGFycy5pbml0KCk7XG5cblx0XHRcdFx0Ly8gQ2hyb21lIGxvYWRzIHZvaWNlcyBhc3luY2hyb25vdXNseS5cblx0XHRcdFx0d2luZG93LnNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgPSBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0XHRtdXNpY2FsQ2hhcnMuaW5pdCgpO1xuXHRcdFx0XHR9O1xuXG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IHV0dGVyYW5jZSBmb3IgdGhlIHNwZWNpZmllZCB0ZXh0IGFuZCBhZGQgaXQgdG9cblx0XHRcdFx0Ly8gdGhlIHF1ZXVlLlxuXHRcdFx0XHRmdW5jdGlvbiBzcGVhayggdGV4dCApIHtcblx0XHRcdFx0XHQvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlLlxuXHRcdFx0XHRcdHZhciBtc2cgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCk7XG5cblx0XHRcdFx0XHQvLyBTZXQgdGhlIHZlcnNlLlxuXHRcdFx0XHRcdG1zZy50ZXh0ID0gbXVzaWNhbENoYXJzLnZvY2Fscy52ZXJzZTE7XG5cblx0XHRcdFx0XHQvLyBTZXQgdGhlIGF0dHJpYnV0ZXMuXG5cdFx0XHRcdFx0bXNnLnZvbHVtZSA9IHBhcnNlRmxvYXQoIDkgKTtcblx0XHRcdFx0XHRtc2cucmF0ZSA9IHBhcnNlRmxvYXQoIG11c2ljYWxDaGFycy52b2NhbHMucmF0ZSApO1xuXHRcdFx0XHRcdG1zZy5waXRjaCA9IHBhcnNlRmxvYXQoIG11c2ljYWxDaGFycy52b2NhbHMucGl0Y2ggKTtcblxuXHRcdFx0XHRcdC8vIElmIGEgdm9pY2UgaGFzIGJlZW4gc2VsZWN0ZWQsIGZpbmQgdGhlIHZvaWNlIGFuZCBzZXQgdGhlXG5cdFx0XHRcdFx0Ly8gdXR0ZXJhbmNlIGluc3RhbmNlJ3Mgdm9pY2UgYXR0cmlidXRlLlxuXHRcdFx0XHRcdC8vIGlmICggdm9pY2VTZWxlY3QudmFsdWUgKSB7XG5cdFx0XHRcdFx0Ly8gXHR2ZXJzZS52b2ljZSA9IHNwZWVjaFN5bnRoZXNpcy5nZXRWb2ljZXMoKS5maWx0ZXIoIGZ1bmN0aW9uKCB2b2ljZSApIHtcblx0XHRcdFx0XHQvLyBcdFx0cmV0dXJuIHZvaWNlLm5hbWUgPT0gdm9pY2VTZWxlY3QudmFsdWU7XG5cdFx0XHRcdFx0Ly8gXHR9IClbIDAgXTtcblx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHQvLyBRdWV1ZSB0aGlzIHV0dGVyYW5jZS5cblx0XHRcdFx0XHR3aW5kb3cuc3BlZWNoU3ludGhlc2lzLnNwZWFrKCBtc2cgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBWb2NhbHNcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogSnVzdCB0aGUgZXhhbXBsZSBpcyBwcmVzZW50bHkgZGVmaW5lZC5cblx0XHRcdFx0ICovXG5cdFx0XHRcdHNwZWFrKCBtdXNpY2FsQ2hhcnMubHlyaWNzLnZlcnNlMSgpICk7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIE11c2ljXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIE5vdyB3ZSBjcmVhdGUgbXVzaWMgZnJvbSB0aGUgcmVwb011c2ljIHZhbHVlcywgdXNpbmcgVG9uZS5qcy5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogSW5zdHJ1bWVudHM6XG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIGRydW1zXG5cdFx0XHRcdCAqIG1hcmltYmFcblx0XHRcdFx0ICogYmFzc1xuXHRcdFx0XHQgKiBmbHV0ZVxuXHRcdFx0XHQgKiBwaWFub1xuXHRcdFx0XHQgKiBzcXVhcmV3YXZlXG5cdFx0XHRcdCAqIHNhd3Rvb3RoIHdhdmVcblx0XHRcdFx0ICpcblx0XHRcdFx0ICovXG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogRHJ1bXNcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogUmVhbGx5IGp1c3QgYSBzbmFyZS5cblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBzbmFyZSA9IG5ldyBUb25lLk5vaXNlU3ludGgoIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMTAsXG5cdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC4yLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDBcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiZmlsdGVyRW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMDEsXG5cdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuMSxcblx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXG5cdFx0XHRcdHZhciBzbmFyZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSApIHtcblx0XHRcdFx0XHRzbmFyZS50cmlnZ2VyQXR0YWNrKCB0aW1lICk7XG5cdFx0XHRcdFx0Y2hhbmdlTnVtYmVyQ29sb3IoKTtcblx0XHRcdFx0XHRjaGFuZ2VCbHVlQ29sb3IoKTtcblx0XHRcdFx0XHQkKCAnLmJ1dHRvbicgKS50b2dnbGVDbGFzcyggJ3BsYXlpbmcnICk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5kcnVtcyApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqICBNYXJpbWJhXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zTWFyaW1iYSA9IG5ldyBUb25lLlBvbHlTeW50aCggNCwgVG9uZS5TeW50aCwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC01LFxuXHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcInBhcnRpYWxzXCI6IFsgMSwgMCwgMiwgMCwgMyBdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMS4yLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAsXG5cdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKVxuXG5cdFx0XHRcdHZhciBpbnNNYXJpbWJhX3BhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblxuXHRcdFx0XHRcdGluc01hcmltYmEudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiOG5cIiwgdGltZSApO1xuXG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5tYXJpbWJhICkuc3RhcnQoKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBCYXNzXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zQmFzcyA9IG5ldyBUb25lLlBvbHlTeW50aCggNCwgVG9uZS5TaW1wbGVGTSwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0zLFxuXHRcdFx0XHRcdFwiaGFybW9uaWNpdHlcIjogMy4wMSxcblx0XHRcdFx0XHRcIm1vZHVsYXRpb25JbmRleFwiOiAxNCxcblx0XHRcdFx0XHRcImNhcnJpZXJcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic2F3dG9vdGg2XCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwibW9kdWxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInRyaWFuZ2xlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAwLjFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cdFx0XHRcdHZhciBiYXNzUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc0Jhc3MudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiNG5cIiwgdGltZSApO1xuXHRcdFx0XHRcdGNoYW5nZUJnQ29sb3IoKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLmJhc3MgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIEZsdXRlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zRmx1dGUgPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDQsIFRvbmUuU2ltcGxlRk0sIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMyxcblx0XHRcdFx0XHRcImhhcm1vbmljaXR5XCI6IDMuMDEsXG5cdFx0XHRcdFx0XCJtb2R1bGF0aW9uSW5kZXhcIjogMTQsXG5cdFx0XHRcdFx0XCJjYXJyaWVyXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInRyaWFuZ2xlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wNSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwibW9kdWxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNxdWFyZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4yLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC4xXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgZmx1dGVQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zRmx1dGUudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiNG5cIiwgdGltZSApO1xuXHRcdFx0XHRcdGNoYW5nZVllbGxvd0NvbG9yKCk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5mbHV0ZSApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogUGFydCA1IC0gcGlhbm9cblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNQaWFubyA9IG5ldyBUb25lLlBvbHlTeW50aCggMiwgVG9uZS5TeW50aCwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC04Ljc1LFxuXHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcInBhcnRpYWxzXCI6IFtcblx0XHRcdCAgIDMxLFxuXHRcdFx0ICAgMjMsXG5cdFx0XHQgICAzLFxuXHRcdFx0ICAgNSxcblx0XHRcdCAgIDUsXG5cdFx0XHQgICAxXG5cdFx0XHRcdF1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMDEsXG5cdFx0XHRcdFx0XHRcImRlY2F5XCI6IDEuMSxcblx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLFxuXHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuNlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIHBpYW5vUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc1BpYW5vLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjFuXCIsIHRpbWUgKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLnBpYW5vICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBTYXd0b290aCB3YXZlIHN5bnRoXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zU2F3dG9vdGh3YXZlID0gbmV3IFRvbmUuUG9seVN5bnRoKCAyLCBUb25lLlNpbXBsZUZNLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTEsXG5cdFx0XHRcdFx0XCJoYXJtb25pY2l0eVwiOiAzLjAxLFxuXHRcdFx0XHRcdFwibW9kdWxhdGlvbkluZGV4XCI6IDE0LFxuXHRcdFx0XHRcdFwiY2FycmllclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzYXd0b290aDZcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMSxcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJtb2R1bGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwidHJpYW5nbGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMixcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIHNhd3Rvb3Rod2F2ZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNTYXd0b290d2F2ZWgudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiNG5cIiwgdGltZSApO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMuc2F3dG9vdGh3YXZlICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBQYXJ0IDYgLSBzcXVhcmV3YXZlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zU3F1YXJld2F2ZSA9IG5ldyBUb25lLlBvbHlTeW50aCggMywgVG9uZS5TaW1wbGVGTSwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0xMixcblx0XHRcdFx0XHRcImhhcm1vbmljaXR5XCI6IDMuMDEsXG5cdFx0XHRcdFx0XCJtb2R1bGF0aW9uSW5kZXhcIjogMTQsXG5cdFx0XHRcdFx0XCJjYXJyaWVyXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNxdWFyZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDUsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4xLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcIm1vZHVsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzcXVhcmVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMixcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIHNxdWFyZXdhdmVQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zU3F1YXJld2F2ZS50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5zcXVhcmV3YXZlICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogUXVldWUgdXAgVG9uZS5qcywgc2V0IGdsb2JhbCB2YWx1ZXMgZnJvbSBHaXRodWIgcmVwbyBkYXRhLlxuXHRcdFx0XHQgKi9cblxuXHRcdFx0XHQvLyBTZXQgdGhlIHRpbWUgc2lnbmF0dXJlXG5cdFx0XHRcdFRvbmUuVHJhbnNwb3J0LnRpbWVTaWduYXR1cmUgPSBbIDQsIDQgXTtcblx0XHRcdFx0Ly9zZXQgdGhlIHRyYW5zcG9ydFxuXHRcdFx0XHRUb25lLlRyYW5zcG9ydC5icG0udmFsdWUgPSAxNjA7XG5cdFx0XHRcdFRvbmUuVHJhbnNwb3J0Lmxvb3AgPSB0cnVlO1xuXG5cdFx0XHR9IC8vIFRoaXMgY29uY2x1ZGVzIG91ciBhamF4XG5cdH0gKVxuXG59ICk7XG4iLCIvKipcbiAqIEhlbHBmdWwgdXRpbGl0aWVzIGZvciBwcm9qZWN0c1xuICpcbiAqIEB0eXBlIHtPYmplY3R9IGNvbW1vbkFVIG9iamVjdFxuICovXG52YXIgY29tbW9uQVUgPSB7XG4gIGRlYnVnZ2VyOiBmdW5jdGlvbiggZXJyb3JNZXNzYWdlICkge1xuICAgIGVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHJldHVybiAnQ29tbW9uIEdvbGQ6ICcgKyAnXFxuJyArIGVycm9yTWVzc2FnZTtcbiAgICBkZWJ1Z2dlcjtcbiAgfSxcbiAgZGVidWc6IGZhbHNlXG59XG5cbi8qKlxuICogQSBjb25zb2xlLmVycm9yIHByb3RvdHlwZVxuICpcbiAqIC0gQ2FsbGFibGUgd2l0aCBgY29uc29sZS5jb21tb25BVSggXCJUaGUgZXJyb3JcIiApYFxuICpcbiAqIEBzaW5jZSAgMC4xXG4gKlxuICogQHJldHVybiB7W2NvbnNvbGUuZXJyb3Igb2JqZWN0XX0gW0Vycm9yIG9iamVjdCBhbmQgZXJyb3IgbWVzc2FnZSBzdHJpbmddXG4gKi9cbmNvbnNvbGUuYXUgPSBmdW5jdGlvbigpIHtcblxuICBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5jYWxsKFxuXG4gICAgYXJndW1lbnRzLFxuICAgIGNvbW1vbkFVLmRlYnVnZ2VyKCkgKTtcblxuICBjb25zb2xlLmxvZy5hcHBseSggY29uc29sZSwgYXJndW1lbnRzICk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
