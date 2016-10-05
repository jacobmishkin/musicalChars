jQuery( document ).ready( function( $ ) {

	'use strict'

	/**
	 * Color changers.
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
	 * Renders the initial, sine wave visualization.
	 *
	 * Defined early so it can be manipulated by Tone.js later.
	 */

	/*
	 * Uses sine-waves lib
	 */

	var waves = new SineWaves( {
		el: document.querySelector( '.waves' ),

		speed: 4,

		width: function() {
			return $( window ).width();
		},

		height: function() {
			return $( window ).height();
		},

		ease: 'SineInOut',

		wavesWidth: '70%',

		waves: [
			{
				timeModifier: 4,
				lineWidth: 1,
				amplitude: -25,
				wavelength: 25
    },
			{
				timeModifier: 2,
				lineWidth: 2,
				amplitude: -50,
				wavelength: 50
    },
			{
				timeModifier: 1,
				lineWidth: 1,
				amplitude: -100,
				wavelength: 100
    },
			{
				timeModifier: 0.5,
				lineWidth: 1,
				amplitude: -200,
				wavelength: 200
    },
			{
				timeModifier: 0.25,
				lineWidth: 2,
				amplitude: -400,
				wavelength: 400
    }
  ],

		// Called on window resize
		resizeEvent: function() {
			var gradient = this.ctx.createLinearGradient( 0, 0, this.width, 0 );
			gradient.addColorStop( 0, "rgba(23, 210, 168, 0.2)" );
			gradient.addColorStop( 0.5, "rgba(255, 255, 255, 0.5)" );
			gradient.addColorStop( 1, "rgba(23, 210, 168, 0.2)" );

			var index = -1;
			var length = this.waves.length;
			while ( ++index < length ) {
				this.waves[ index ].strokeStyle = gradient;
			}

			// Clean Up
			index = void 0;
			length = void 0;
			gradient = void 0;
		}
	} );


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

				if ( !repo.data ) {
					return;
				}

				// if ( undefined === repo.data || repo.message.indexOf( 'API rate limit exceeded' ) >= 0 ) {
				// 	// Should we add in auth? This is going to get really annoying...
				// 	console.au( 'Aw shit, you hit the Github aunauthenticated API usage rate limit. It should reset in a few minutes.' );
				// 	return;
				// }

				console.au( 'Repository data:' );
				console.table( repo.data );

				var len = repo.length;

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
						// @todo - calculate time signature based on # of commits + contributors?
						if ( repo.data.commit.message.length > 5 ) {
							return [ 4, 4 ];
						} else if ( repo.data.commit.length > 50 ) {
							return [ 3, 4 ];
						}
					},
					duration: repo.length * 100,
					key: function() {

						// Song is in the key of C by default
						var defaultKey = 'c';

						// Get the first character of the first commit from the jsonp
						var char = repo.data[ 0 ].commit.message.substr( 0, 1 );

						if ( char == 'a' || char == 'A' || char == '1' ) {
							return 'a';
						} else if ( char == 'b' || char == 'B' || char == '2' ) {
							return 'b';
						} else if ( char == 'c' || char == 'C' || char == '3' ) {
							return 'c';
						} else if ( char == 'd' || char == 'D' || char == '4' ) {
							return 'd';
						} else if ( char == 'e' || char == 'E' || char == '5' ) {
							return 'e';
						} else if ( char == 'f' || char == 'F' || char == '6' ) {
							return 'f';
						} else if ( char == 'g' || char == 'G' || char == '7' ) {
							return 'a';
						} else {

							// @todo: some arbitrary assignment on these remaining character possibles.
							var plebs = [ 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '8', '9', '0' ];

							return defaultKey;
						}
					},
					isMinor: function() {
						// How should a major or minor key be determined?
						// Perhaps searching for certain keywords, eg
						// a high istance of profanity in commit messages would be a minor key...
						//
						// @todo
						return false;
					},
					majorMinor: function() {
						if ( true === musicalChars.isMinor ) {
							return 'minor';
						} else {
							return 'major';
						}

						// happy by default :-)
						return 'major';
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
						verses: {
							// verses will be dynamically created via a loop I guess?
							'temp': 'not',
							'done': 'yet'
						},
						verse1: function() {

							if ( !musicalChars.hasSpeech() ) {
								return false;
								console.error( 'no speech' );
							}

							if ( repo.data[ 0 ].commit.message ) {
								return repo.data[ 0 ].commit.message;
							} else {
								return false;
								console.error( 'No commit messages were found.' );
							}
						}
					},
					vocals: {
						// Plan is to try to match the relative pitch to the key the music is in.
						pitch: .6,
						// Adjust rate based on the bpm value of the song.
						rate: .5
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
					ui: {
						button: function( buttonText, buttonClass ) {
							// @todo define append behavior conditions via switch or something
							return '<button class="' + buttonClass + '">' + buttonText + '<button>';
						}
					},
					render: function() {
						$( '.out h2' ).html( '<span class="title">' + repoNameExample + '</span> <span class="key-subtitle">in <span class="key">' + musicalChars.key() + '</span> ' + musicalChars.majorMinor() + '</span>' );
					},
					init: function() {
						musicalChars.render();

						/**
						 * Start up speech synthesis engine.
						 *
						 * @type {[type]}
						 */
						var voices = speechSynthesis.getVoices();

						// Loop through each of the voices.
						voices.forEach( function( voice, i ) {

							var voiceName = voice.name;

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
					msg.text = musicalChars.lyrics.verse1();

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbmdvbGQudXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJqUXVlcnkoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCAkICkge1xuXG5cdCd1c2Ugc3RyaWN0J1xuXG5cdC8qKlxuXHQgKiBDb2xvciBjaGFuZ2Vycy5cblx0ICovXG5cblx0dmFyIGJnY29sb3JzID0gW1xuXHRcIiNGM0YzMTVcIixcblx0XCIjQzFGRDMzXCIsXG5cdFwiI0ZGOTkzM1wiLFxuXHRcIiNGQzVBQjhcIixcblx0XCIjMERENUZDXCIsXG5cdFwiZ3JleVwiLFxuXHRcImFxdWFcIixcblx0XCJjb3JuZmxvd2VyXCIsXG5cdFwic2FsbW9uXCIsXG5cdFwib3JhbmdlXCIsXG5cdFwiYmxhY2tcIixcblx0XCJwdXJwbGVcIixcblx0XCJwaW5rXCJcblx0XTtcblxuXHRmdW5jdGlvbiBjaGFuZ2VCZ0NvbG9yKCkge1xuXHRcdHZhciBlbF9ib2R5ID0gJCggJ2JvZHknICk7XG5cdFx0ZWxfYm9keS5jc3MoICdiYWNrZ3JvdW5kLWNvbG9yJywgYmdjb2xvcnNbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGFuZ2VOdW1iZXJDb2xvcigpIHtcblx0XHR2YXIgZWxfbnVtYmVyID0gJCggJy5udW1iZXInICk7XG5cdFx0ZWxfbnVtYmVyLmNzcyggJ2NvbG9yJywgcmVkc1sgTWF0aC5mbG9vciggKCBNYXRoLnJhbmRvbSgpICogNCApICsgMSApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZUJsdWVDb2xvcigpIHtcblx0XHR2YXIgZWxfYmx1ZSA9ICQoICcuYmx1ZUJveCcgKTtcblx0XHRlbF9ibHVlLmNzcyggJ2JhY2tncm91bmQtY29sb3InLCBibHVlc1sgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGJsdWVzLmxlbmd0aCApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZVllbGxvd0NvbG9yKCkge1xuXHRcdHZhciBlbF95ZWxsb3cgPSAkKCAnLnllbGxvd0JveCcgKTtcblx0XHRlbF95ZWxsb3cuY3NzKCAnYmFja2dyb3VuZC1jb2xvcicsIHllbGxvd3NbIE1hdGguZmxvb3IoICggTWF0aC5yYW5kb20oKSAqIDggKSArIDEgKSBdICk7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyB0aGUgaW5pdGlhbCwgc2luZSB3YXZlIHZpc3VhbGl6YXRpb24uXG5cdCAqXG5cdCAqIERlZmluZWQgZWFybHkgc28gaXQgY2FuIGJlIG1hbmlwdWxhdGVkIGJ5IFRvbmUuanMgbGF0ZXIuXG5cdCAqL1xuXG5cdC8qXG5cdCAqIFVzZXMgc2luZS13YXZlcyBsaWJcblx0ICovXG5cblx0dmFyIHdhdmVzID0gbmV3IFNpbmVXYXZlcygge1xuXHRcdGVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLndhdmVzJyApLFxuXG5cdFx0c3BlZWQ6IDQsXG5cblx0XHR3aWR0aDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gJCggd2luZG93ICkud2lkdGgoKTtcblx0XHR9LFxuXG5cdFx0aGVpZ2h0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiAkKCB3aW5kb3cgKS5oZWlnaHQoKTtcblx0XHR9LFxuXG5cdFx0ZWFzZTogJ1NpbmVJbk91dCcsXG5cblx0XHR3YXZlc1dpZHRoOiAnNzAlJyxcblxuXHRcdHdhdmVzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpbWVNb2RpZmllcjogNCxcblx0XHRcdFx0bGluZVdpZHRoOiAxLFxuXHRcdFx0XHRhbXBsaXR1ZGU6IC0yNSxcblx0XHRcdFx0d2F2ZWxlbmd0aDogMjVcbiAgICB9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aW1lTW9kaWZpZXI6IDIsXG5cdFx0XHRcdGxpbmVXaWR0aDogMixcblx0XHRcdFx0YW1wbGl0dWRlOiAtNTAsXG5cdFx0XHRcdHdhdmVsZW5ndGg6IDUwXG4gICAgfSxcblx0XHRcdHtcblx0XHRcdFx0dGltZU1vZGlmaWVyOiAxLFxuXHRcdFx0XHRsaW5lV2lkdGg6IDEsXG5cdFx0XHRcdGFtcGxpdHVkZTogLTEwMCxcblx0XHRcdFx0d2F2ZWxlbmd0aDogMTAwXG4gICAgfSxcblx0XHRcdHtcblx0XHRcdFx0dGltZU1vZGlmaWVyOiAwLjUsXG5cdFx0XHRcdGxpbmVXaWR0aDogMSxcblx0XHRcdFx0YW1wbGl0dWRlOiAtMjAwLFxuXHRcdFx0XHR3YXZlbGVuZ3RoOiAyMDBcbiAgICB9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aW1lTW9kaWZpZXI6IDAuMjUsXG5cdFx0XHRcdGxpbmVXaWR0aDogMixcblx0XHRcdFx0YW1wbGl0dWRlOiAtNDAwLFxuXHRcdFx0XHR3YXZlbGVuZ3RoOiA0MDBcbiAgICB9XG4gIF0sXG5cblx0XHQvLyBDYWxsZWQgb24gd2luZG93IHJlc2l6ZVxuXHRcdHJlc2l6ZUV2ZW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBncmFkaWVudCA9IHRoaXMuY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KCAwLCAwLCB0aGlzLndpZHRoLCAwICk7XG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoIDAsIFwicmdiYSgyMywgMjEwLCAxNjgsIDAuMilcIiApO1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKCAwLjUsIFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpXCIgKTtcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCggMSwgXCJyZ2JhKDIzLCAyMTAsIDE2OCwgMC4yKVwiICk7XG5cblx0XHRcdHZhciBpbmRleCA9IC0xO1xuXHRcdFx0dmFyIGxlbmd0aCA9IHRoaXMud2F2ZXMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCArK2luZGV4IDwgbGVuZ3RoICkge1xuXHRcdFx0XHR0aGlzLndhdmVzWyBpbmRleCBdLnN0cm9rZVN0eWxlID0gZ3JhZGllbnQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFuIFVwXG5cdFx0XHRpbmRleCA9IHZvaWQgMDtcblx0XHRcdGxlbmd0aCA9IHZvaWQgMDtcblx0XHRcdGdyYWRpZW50ID0gdm9pZCAwO1xuXHRcdH1cblx0fSApO1xuXG5cblx0LyoqXG5cdCAqIEdldCB1c2VyIGlucHV0XG5cdCAqXG5cdCAqIEB0eXBlIHtbdHlwZV19XG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBPbiBjbGlja1xuXHQgKlxuXHQgKiBAc2luY2UgIFtzaW5jZV1cblx0ICpcblx0ICogQHBhcmFtICB7W3R5cGVdfSBldmVudFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgIFtkZXNjcmlwdGlvbl1cblx0ICovXG5cdCQoICdidXR0b24nICkub24oICdjbGljaycsIGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdHZhciB1c2VyT3JPcmcgPSAkKCAnaW5wdXQudXNlci1vci1vcmcnICkudmFsKCk7XG5cdFx0dmFyIHJlcG9OYW1lID0gJCggJ2lucHV0LnJlcG8tbmFtZScgKS52YWwoKTtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc29sZS50YWJsZSggdXNlck9yT3JnLCByZXBvTmFtZSApO1xuXG5cdH0gKTtcblxuXHQvKipcblx0ICogR2V0IHRoZWlyIEdpdGh1YiBBUEkgdjMgZmVlZFxuXHQgKi9cblxuXHQvKipcblx0ICogR2l0aHViIEFQSSB2MyBqc29ucCBpcyByZXR1cm5lZCBpbiB0aGUgZm9ybWF0IG9mOlxuXHQgKiBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLzx1c2VyIG9yIG9yZ2FuaXphdGlvbj4vPG5hbWUgb2YgcmVwb3NpdG9yeT4vY29tbWl0cz9jYWxsYmFjaz1yZXBvXG5cdCAqICh3aXRoIHRoZSBjYWxsYmFjayB2YWx1ZSBiZWluZyB0aGUganNvbnAgcGF5bG9hZClcblx0ICovXG5cdHZhciB1c2VyT3JPcmdFeGFtcGxlID0gJ2NvbW1vbi1nb2xkJztcblx0dmFyIHJlcG9OYW1lRXhhbXBsZSA9ICdtdXNpY2FsQ2hhcnMnO1xuXHR2YXIgcmVwb1VSTCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLycgKyB1c2VyT3JPcmdFeGFtcGxlICsgJy8nICsgcmVwb05hbWVFeGFtcGxlICsgJy9jb21taXRzP2NhbGxiYWNrPXJlcG8nO1xuXG5cdCQuYWpheCgge1xuXHRcdHVybDogcmVwb1VSTCxcblx0XHRkYXRhVHlwZTogJ2pzb25wJyxcblx0XHRzdWNjZXNzOiBmdW5jdGlvbiggcmVwbyApIHtcblxuXHRcdFx0XHRpZiAoICFyZXBvLmRhdGEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaWYgKCB1bmRlZmluZWQgPT09IHJlcG8uZGF0YSB8fCByZXBvLm1lc3NhZ2UuaW5kZXhPZiggJ0FQSSByYXRlIGxpbWl0IGV4Y2VlZGVkJyApID49IDAgKSB7XG5cdFx0XHRcdC8vIFx0Ly8gU2hvdWxkIHdlIGFkZCBpbiBhdXRoPyBUaGlzIGlzIGdvaW5nIHRvIGdldCByZWFsbHkgYW5ub3lpbmcuLi5cblx0XHRcdFx0Ly8gXHRjb25zb2xlLmF1KCAnQXcgc2hpdCwgeW91IGhpdCB0aGUgR2l0aHViIGF1bmF1dGhlbnRpY2F0ZWQgQVBJIHVzYWdlIHJhdGUgbGltaXQuIEl0IHNob3VsZCByZXNldCBpbiBhIGZldyBtaW51dGVzLicgKTtcblx0XHRcdFx0Ly8gXHRyZXR1cm47XG5cdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRjb25zb2xlLmF1KCAnUmVwb3NpdG9yeSBkYXRhOicgKTtcblx0XHRcdFx0Y29uc29sZS50YWJsZSggcmVwby5kYXRhICk7XG5cblx0XHRcdFx0dmFyIGxlbiA9IHJlcG8ubGVuZ3RoO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBQYXJzZSBqc29ucCBhbmQgY2FsY3VhdGUgdmFyaW91cyBhcmJpdHJhcnkgbXVzaWNhbCBwcm9wZXJ0aWVzLCBhbmQgYXNzaWduIHRoZW0gdG8gdGhlIHJlcG9NdXNpYyBvYmplY3QuXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIEB0b2RvXG5cdFx0XHRcdCAqL1xuXG5cdFx0XHRcdHZhciBtdXNpY2FsQ2hhcnMgPSB7XG5cdFx0XHRcdFx0YnBtOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBjYWxjQlBNID0gMTIwO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNhbGNCUE07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0aW1lU2lnbmF0dXJlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdC8vIEB0b2RvIC0gY2FsY3VsYXRlIHRpbWUgc2lnbmF0dXJlIGJhc2VkIG9uICMgb2YgY29tbWl0cyArIGNvbnRyaWJ1dG9ycz9cblx0XHRcdFx0XHRcdGlmICggcmVwby5kYXRhLmNvbW1pdC5tZXNzYWdlLmxlbmd0aCA+IDUgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBbIDQsIDQgXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHJlcG8uZGF0YS5jb21taXQubGVuZ3RoID4gNTAgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBbIDMsIDQgXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGR1cmF0aW9uOiByZXBvLmxlbmd0aCAqIDEwMCxcblx0XHRcdFx0XHRrZXk6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQvLyBTb25nIGlzIGluIHRoZSBrZXkgb2YgQyBieSBkZWZhdWx0XG5cdFx0XHRcdFx0XHR2YXIgZGVmYXVsdEtleSA9ICdjJztcblxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIGZpcnN0IGNvbW1pdCBmcm9tIHRoZSBqc29ucFxuXHRcdFx0XHRcdFx0dmFyIGNoYXIgPSByZXBvLmRhdGFbIDAgXS5jb21taXQubWVzc2FnZS5zdWJzdHIoIDAsIDEgKTtcblxuXHRcdFx0XHRcdFx0aWYgKCBjaGFyID09ICdhJyB8fCBjaGFyID09ICdBJyB8fCBjaGFyID09ICcxJyApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICdhJztcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGNoYXIgPT0gJ2InIHx8IGNoYXIgPT0gJ0InIHx8IGNoYXIgPT0gJzInICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2InO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggY2hhciA9PSAnYycgfHwgY2hhciA9PSAnQycgfHwgY2hhciA9PSAnMycgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAnYyc7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjaGFyID09ICdkJyB8fCBjaGFyID09ICdEJyB8fCBjaGFyID09ICc0JyApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICdkJztcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGNoYXIgPT0gJ2UnIHx8IGNoYXIgPT0gJ0UnIHx8IGNoYXIgPT0gJzUnICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2UnO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggY2hhciA9PSAnZicgfHwgY2hhciA9PSAnRicgfHwgY2hhciA9PSAnNicgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAnZic7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjaGFyID09ICdnJyB8fCBjaGFyID09ICdHJyB8fCBjaGFyID09ICc3JyApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICdhJztcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQHRvZG86IHNvbWUgYXJiaXRyYXJ5IGFzc2lnbm1lbnQgb24gdGhlc2UgcmVtYWluaW5nIGNoYXJhY3RlciBwb3NzaWJsZXMuXG5cdFx0XHRcdFx0XHRcdHZhciBwbGVicyA9IFsgJ2gnLCAnaScsICdqJywgJ2snLCAnbCcsICdtJywgJ24nLCAnbycsICdwJywgJ3EnLCAncicsICdzJywgJ3QnLCAndScsICd2JywgJ3cnLCAneCcsICd5JywgJ3onLCAnSCcsICdJJywgJ0onLCAnSycsICdMJywgJ00nLCAnTicsICdPJywgJ1AnLCAnUScsICdSJywgJ1MnLCAnVCcsICdVJywgJ1YnLCAnVycsICdYJywgJ1knLCAnWicsICc4JywgJzknLCAnMCcgXTtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZGVmYXVsdEtleTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGlzTWlub3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Ly8gSG93IHNob3VsZCBhIG1ham9yIG9yIG1pbm9yIGtleSBiZSBkZXRlcm1pbmVkP1xuXHRcdFx0XHRcdFx0Ly8gUGVyaGFwcyBzZWFyY2hpbmcgZm9yIGNlcnRhaW4ga2V5d29yZHMsIGVnXG5cdFx0XHRcdFx0XHQvLyBhIGhpZ2ggaXN0YW5jZSBvZiBwcm9mYW5pdHkgaW4gY29tbWl0IG1lc3NhZ2VzIHdvdWxkIGJlIGEgbWlub3Iga2V5Li4uXG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0Ly8gQHRvZG9cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG1ham9yTWlub3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCB0cnVlID09PSBtdXNpY2FsQ2hhcnMuaXNNaW5vciApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICdtaW5vcic7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ21ham9yJztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gaGFwcHkgYnkgZGVmYXVsdCA6LSlcblx0XHRcdFx0XHRcdHJldHVybiAnbWFqb3InO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aGFzU3BlZWNoOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoICdzcGVlY2hTeW50aGVzaXMnIGluIHdpbmRvdyApID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aGFzRHJ1bXM6IHRydWUsXG5cdFx0XHRcdFx0aGFzTWFyaW1iYTogdHJ1ZSxcblx0XHRcdFx0XHRoYXNCYXNzOiB0cnVlLFxuXHRcdFx0XHRcdGhhc0ZsdXRlOiB0cnVlLFxuXHRcdFx0XHRcdGhhc1BpYW5vOiB0cnVlLFxuXHRcdFx0XHRcdGhhc1NxdWFyZTogdHJ1ZSxcblx0XHRcdFx0XHRoYXNTYXd0b290aDogdHJ1ZSxcblx0XHRcdFx0XHRseXJpY3M6IHtcblx0XHRcdFx0XHRcdHZlcnNlczoge1xuXHRcdFx0XHRcdFx0XHQvLyB2ZXJzZXMgd2lsbCBiZSBkeW5hbWljYWxseSBjcmVhdGVkIHZpYSBhIGxvb3AgSSBndWVzcz9cblx0XHRcdFx0XHRcdFx0J3RlbXAnOiAnbm90Jyxcblx0XHRcdFx0XHRcdFx0J2RvbmUnOiAneWV0J1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHZlcnNlMTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCAhbXVzaWNhbENoYXJzLmhhc1NwZWVjaCgpICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCAnbm8gc3BlZWNoJyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKCByZXBvLmRhdGFbIDAgXS5jb21taXQubWVzc2FnZSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVwby5kYXRhWyAwIF0uY29tbWl0Lm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdObyBjb21taXQgbWVzc2FnZXMgd2VyZSBmb3VuZC4nICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHZvY2Fsczoge1xuXHRcdFx0XHRcdFx0Ly8gUGxhbiBpcyB0byB0cnkgdG8gbWF0Y2ggdGhlIHJlbGF0aXZlIHBpdGNoIHRvIHRoZSBrZXkgdGhlIG11c2ljIGlzIGluLlxuXHRcdFx0XHRcdFx0cGl0Y2g6IC42LFxuXHRcdFx0XHRcdFx0Ly8gQWRqdXN0IHJhdGUgYmFzZWQgb24gdGhlIGJwbSB2YWx1ZSBvZiB0aGUgc29uZy5cblx0XHRcdFx0XHRcdHJhdGU6IC41XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRub3Rlczoge1xuXHRcdFx0XHRcdFx0ZHJ1bXM6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRtYXJpbWJhOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0YmFzczogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGZsdXRlOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cGlhbm86IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzYXd0b290aHdhdmU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzcXVhcmV3YXZlOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR1aToge1xuXHRcdFx0XHRcdFx0YnV0dG9uOiBmdW5jdGlvbiggYnV0dG9uVGV4dCwgYnV0dG9uQ2xhc3MgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEB0b2RvIGRlZmluZSBhcHBlbmQgYmVoYXZpb3IgY29uZGl0aW9ucyB2aWEgc3dpdGNoIG9yIHNvbWV0aGluZ1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJzxidXR0b24gY2xhc3M9XCInICsgYnV0dG9uQ2xhc3MgKyAnXCI+JyArIGJ1dHRvblRleHQgKyAnPGJ1dHRvbj4nO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQoICcub3V0IGgyJyApLmh0bWwoICc8c3BhbiBjbGFzcz1cInRpdGxlXCI+JyArIHJlcG9OYW1lRXhhbXBsZSArICc8L3NwYW4+IDxzcGFuIGNsYXNzPVwia2V5LXN1YnRpdGxlXCI+aW4gPHNwYW4gY2xhc3M9XCJrZXlcIj4nICsgbXVzaWNhbENoYXJzLmtleSgpICsgJzwvc3Bhbj4gJyArIG11c2ljYWxDaGFycy5tYWpvck1pbm9yKCkgKyAnPC9zcGFuPicgKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0bXVzaWNhbENoYXJzLnJlbmRlcigpO1xuXG5cdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdCAqIFN0YXJ0IHVwIHNwZWVjaCBzeW50aGVzaXMgZW5naW5lLlxuXHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdCAqIEB0eXBlIHtbdHlwZV19XG5cdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdHZhciB2b2ljZXMgPSBzcGVlY2hTeW50aGVzaXMuZ2V0Vm9pY2VzKCk7XG5cblx0XHRcdFx0XHRcdC8vIExvb3AgdGhyb3VnaCBlYWNoIG9mIHRoZSB2b2ljZXMuXG5cdFx0XHRcdFx0XHR2b2ljZXMuZm9yRWFjaCggZnVuY3Rpb24oIHZvaWNlLCBpICkge1xuXG5cdFx0XHRcdFx0XHRcdHZhciB2b2ljZU5hbWUgPSB2b2ljZS5uYW1lO1xuXG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRtdXNpY2FsQ2hhcnMuaW5pdCgpO1xuXG5cdFx0XHRcdC8vIENocm9tZSBsb2FkcyB2b2ljZXMgYXN5bmNocm9ub3VzbHkuXG5cdFx0XHRcdHdpbmRvdy5zcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkID0gZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdFx0bXVzaWNhbENoYXJzLmluaXQoKTtcblx0XHRcdFx0fTtcblxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyB1dHRlcmFuY2UgZm9yIHRoZSBzcGVjaWZpZWQgdGV4dCBhbmQgYWRkIGl0IHRvXG5cdFx0XHRcdC8vIHRoZSBxdWV1ZS5cblx0XHRcdFx0ZnVuY3Rpb24gc3BlYWsoIHRleHQgKSB7XG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZS5cblx0XHRcdFx0XHR2YXIgbXNnID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpO1xuXG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSB2ZXJzZS5cblx0XHRcdFx0XHRtc2cudGV4dCA9IG11c2ljYWxDaGFycy5seXJpY3MudmVyc2UxKCk7XG5cblx0XHRcdFx0XHQvLyBTZXQgdGhlIGF0dHJpYnV0ZXMuXG5cdFx0XHRcdFx0bXNnLnZvbHVtZSA9IHBhcnNlRmxvYXQoIDkgKTtcblx0XHRcdFx0XHRtc2cucmF0ZSA9IHBhcnNlRmxvYXQoIG11c2ljYWxDaGFycy52b2NhbHMucmF0ZSApO1xuXHRcdFx0XHRcdG1zZy5waXRjaCA9IHBhcnNlRmxvYXQoIG11c2ljYWxDaGFycy52b2NhbHMucGl0Y2ggKTtcblxuXHRcdFx0XHRcdC8vIElmIGEgdm9pY2UgaGFzIGJlZW4gc2VsZWN0ZWQsIGZpbmQgdGhlIHZvaWNlIGFuZCBzZXQgdGhlXG5cdFx0XHRcdFx0Ly8gdXR0ZXJhbmNlIGluc3RhbmNlJ3Mgdm9pY2UgYXR0cmlidXRlLlxuXHRcdFx0XHRcdC8vIGlmICggdm9pY2VTZWxlY3QudmFsdWUgKSB7XG5cdFx0XHRcdFx0Ly8gXHR2ZXJzZS52b2ljZSA9IHNwZWVjaFN5bnRoZXNpcy5nZXRWb2ljZXMoKS5maWx0ZXIoIGZ1bmN0aW9uKCB2b2ljZSApIHtcblx0XHRcdFx0XHQvLyBcdFx0cmV0dXJuIHZvaWNlLm5hbWUgPT0gdm9pY2VTZWxlY3QudmFsdWU7XG5cdFx0XHRcdFx0Ly8gXHR9IClbIDAgXTtcblx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHQvLyBRdWV1ZSB0aGlzIHV0dGVyYW5jZS5cblx0XHRcdFx0XHR3aW5kb3cuc3BlZWNoU3ludGhlc2lzLnNwZWFrKCBtc2cgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBWb2NhbHNcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogSnVzdCB0aGUgZXhhbXBsZSBpcyBwcmVzZW50bHkgZGVmaW5lZC5cblx0XHRcdFx0ICovXG5cdFx0XHRcdHNwZWFrKCBtdXNpY2FsQ2hhcnMubHlyaWNzLnZlcnNlMSgpICk7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIE11c2ljXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIE5vdyB3ZSBjcmVhdGUgbXVzaWMgZnJvbSB0aGUgcmVwb011c2ljIHZhbHVlcywgdXNpbmcgVG9uZS5qcy5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogSW5zdHJ1bWVudHM6XG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIGRydW1zXG5cdFx0XHRcdCAqIG1hcmltYmFcblx0XHRcdFx0ICogYmFzc1xuXHRcdFx0XHQgKiBmbHV0ZVxuXHRcdFx0XHQgKiBwaWFub1xuXHRcdFx0XHQgKiBzcXVhcmV3YXZlXG5cdFx0XHRcdCAqIHNhd3Rvb3RoIHdhdmVcblx0XHRcdFx0ICpcblx0XHRcdFx0ICovXG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogRHJ1bXNcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogUmVhbGx5IGp1c3QgYSBzbmFyZS5cblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBzbmFyZSA9IG5ldyBUb25lLk5vaXNlU3ludGgoIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMTAsXG5cdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC4yLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDBcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiZmlsdGVyRW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMDEsXG5cdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuMSxcblx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXG5cdFx0XHRcdHZhciBzbmFyZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSApIHtcblx0XHRcdFx0XHRzbmFyZS50cmlnZ2VyQXR0YWNrKCB0aW1lICk7XG5cdFx0XHRcdFx0Y2hhbmdlTnVtYmVyQ29sb3IoKTtcblx0XHRcdFx0XHRjaGFuZ2VCbHVlQ29sb3IoKTtcblx0XHRcdFx0XHQkKCAnLmJ1dHRvbicgKS50b2dnbGVDbGFzcyggJ3BsYXlpbmcnICk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5kcnVtcyApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqICBNYXJpbWJhXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zTWFyaW1iYSA9IG5ldyBUb25lLlBvbHlTeW50aCggNCwgVG9uZS5TeW50aCwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC01LFxuXHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcInBhcnRpYWxzXCI6IFsgMSwgMCwgMiwgMCwgMyBdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMS4yLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAsXG5cdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKVxuXG5cdFx0XHRcdHZhciBpbnNNYXJpbWJhX3BhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblxuXHRcdFx0XHRcdGluc01hcmltYmEudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiOG5cIiwgdGltZSApO1xuXG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5tYXJpbWJhICkuc3RhcnQoKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBCYXNzXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zQmFzcyA9IG5ldyBUb25lLlBvbHlTeW50aCggNCwgVG9uZS5TaW1wbGVGTSwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0zLFxuXHRcdFx0XHRcdFwiaGFybW9uaWNpdHlcIjogMy4wMSxcblx0XHRcdFx0XHRcIm1vZHVsYXRpb25JbmRleFwiOiAxNCxcblx0XHRcdFx0XHRcImNhcnJpZXJcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic2F3dG9vdGg2XCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwibW9kdWxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInRyaWFuZ2xlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAwLjFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cdFx0XHRcdHZhciBiYXNzUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc0Jhc3MudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiNG5cIiwgdGltZSApO1xuXHRcdFx0XHRcdGNoYW5nZUJnQ29sb3IoKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLmJhc3MgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIEZsdXRlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zRmx1dGUgPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDQsIFRvbmUuU2ltcGxlRk0sIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMyxcblx0XHRcdFx0XHRcImhhcm1vbmljaXR5XCI6IDMuMDEsXG5cdFx0XHRcdFx0XCJtb2R1bGF0aW9uSW5kZXhcIjogMTQsXG5cdFx0XHRcdFx0XCJjYXJyaWVyXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInRyaWFuZ2xlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wNSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwibW9kdWxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNxdWFyZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4yLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC4xXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgZmx1dGVQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zRmx1dGUudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiNG5cIiwgdGltZSApO1xuXHRcdFx0XHRcdGNoYW5nZVllbGxvd0NvbG9yKCk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5mbHV0ZSApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogUGFydCA1IC0gcGlhbm9cblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNQaWFubyA9IG5ldyBUb25lLlBvbHlTeW50aCggMiwgVG9uZS5TeW50aCwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC04Ljc1LFxuXHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcInBhcnRpYWxzXCI6IFtcblx0XHRcdCAgIDMxLFxuXHRcdFx0ICAgMjMsXG5cdFx0XHQgICAzLFxuXHRcdFx0ICAgNSxcblx0XHRcdCAgIDUsXG5cdFx0XHQgICAxXG5cdFx0XHRcdF1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMDEsXG5cdFx0XHRcdFx0XHRcImRlY2F5XCI6IDEuMSxcblx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLFxuXHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuNlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIHBpYW5vUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc1BpYW5vLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjFuXCIsIHRpbWUgKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLnBpYW5vICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBTYXd0b290aCB3YXZlIHN5bnRoXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zU2F3dG9vdGh3YXZlID0gbmV3IFRvbmUuUG9seVN5bnRoKCAyLCBUb25lLlNpbXBsZUZNLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTEsXG5cdFx0XHRcdFx0XCJoYXJtb25pY2l0eVwiOiAzLjAxLFxuXHRcdFx0XHRcdFwibW9kdWxhdGlvbkluZGV4XCI6IDE0LFxuXHRcdFx0XHRcdFwiY2FycmllclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzYXd0b290aDZcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMSxcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJtb2R1bGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwidHJpYW5nbGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMixcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIHNhd3Rvb3Rod2F2ZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNTYXd0b290d2F2ZWgudHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiNG5cIiwgdGltZSApO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMuc2F3dG9vdGh3YXZlICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBQYXJ0IDYgLSBzcXVhcmV3YXZlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR2YXIgaW5zU3F1YXJld2F2ZSA9IG5ldyBUb25lLlBvbHlTeW50aCggMywgVG9uZS5TaW1wbGVGTSwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0xMixcblx0XHRcdFx0XHRcImhhcm1vbmljaXR5XCI6IDMuMDEsXG5cdFx0XHRcdFx0XCJtb2R1bGF0aW9uSW5kZXhcIjogMTQsXG5cdFx0XHRcdFx0XCJjYXJyaWVyXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNxdWFyZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDUsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4xLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcIm1vZHVsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzcXVhcmVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMixcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIHNxdWFyZXdhdmVQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zU3F1YXJld2F2ZS50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5zcXVhcmV3YXZlICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogUXVldWUgdXAgVG9uZS5qcywgc2V0IGdsb2JhbCB2YWx1ZXMgZnJvbSBHaXRodWIgcmVwbyBkYXRhLlxuXHRcdFx0XHQgKi9cblxuXHRcdFx0XHQvLyBTZXQgdGhlIHRpbWUgc2lnbmF0dXJlXG5cdFx0XHRcdFRvbmUuVHJhbnNwb3J0LnRpbWVTaWduYXR1cmUgPSBbIDQsIDQgXTtcblx0XHRcdFx0Ly9zZXQgdGhlIHRyYW5zcG9ydFxuXHRcdFx0XHRUb25lLlRyYW5zcG9ydC5icG0udmFsdWUgPSAxNjA7XG5cdFx0XHRcdFRvbmUuVHJhbnNwb3J0Lmxvb3AgPSB0cnVlO1xuXG5cdFx0XHR9IC8vIFRoaXMgY29uY2x1ZGVzIG91ciBhamF4XG5cdH0gKVxuXG59ICk7XG4iLCIvKipcbiAqIEhlbHBmdWwgdXRpbGl0aWVzIGZvciBwcm9qZWN0c1xuICpcbiAqIEB0eXBlIHtPYmplY3R9IGNvbW1vbkFVIG9iamVjdFxuICovXG52YXIgY29tbW9uQVUgPSB7XG4gIGRlYnVnZ2VyOiBmdW5jdGlvbiggZXJyb3JNZXNzYWdlICkge1xuICAgIGVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHJldHVybiAnQ29tbW9uIEdvbGQ6ICcgKyAnXFxuJyArIGVycm9yTWVzc2FnZTtcbiAgICBkZWJ1Z2dlcjtcbiAgfSxcbiAgZGVidWc6IGZhbHNlXG59XG5cbi8qKlxuICogQSBjb25zb2xlLmVycm9yIHByb3RvdHlwZVxuICpcbiAqIC0gQ2FsbGFibGUgd2l0aCBgY29uc29sZS5jb21tb25BVSggXCJUaGUgZXJyb3JcIiApYFxuICpcbiAqIEBzaW5jZSAgMC4xXG4gKlxuICogQHJldHVybiB7W2NvbnNvbGUuZXJyb3Igb2JqZWN0XX0gW0Vycm9yIG9iamVjdCBhbmQgZXJyb3IgbWVzc2FnZSBzdHJpbmddXG4gKi9cblxuXG52YXIgYXVDb25zb2xlU3R5bGVzID0gW1xuICAgICdiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoZ29sZCwgZ29sZGVucm9kKSdcbiAgICAsICdib3JkZXI6IDZweCBzb2xpZCBnb2xkJ1xuICAgICwgJ2NvbG9yOiBibGFjaydcbiAgICAsICdkaXNwbGF5OiBibG9jaydcbiAgICAsICdsaW5lLWhlaWdodDogMjRweCdcbiAgICAsICd0ZXh0LWFsaWduOiBsZWZ0J1xuICAgICwgJ21hcmdpbjogNHB4J1xuICAgICwgJ2ZvbnQtd2VpZ2h0OiBib2xkJ1xuXS5qb2luKCAnOycgKTtcblxuY29uc29sZS5hdSA9IGZ1bmN0aW9uKCBtZXNzYWdlICkge1xuICBjb25zb2xlLmxvZyggJyVjJyArICcgKiBDb21tb24uYXU6ICcgKyBtZXNzYWdlLCBhdUNvbnNvbGVTdHlsZXMgKyAnIConICk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
