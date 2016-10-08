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
		// @todo We should check if this needs to be debounced
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
		// console.table( userOrOrg, repoName );

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

				// console.au( 'Repository data:' );
				// console.table( repo.data );

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

							// Notes can be one of 24 tonally-unique keys:
							// C; Db(/C#); D; Eb(/D#); E; F; F#/Gb; G; Ab(/G#); A; Bb(/A#); B

							var marimbaNotes = [];

							$.each( repo.data, function() {

								// Get the commit sha hash for each commit, parse it as base 16, and round it to the nearest int.
								var marimbaNote = Math.round( parseInt( this.commit.tree.sha, 10 ) );
								marimbaNote = Math.round( marimbaNote );

								// If the value returned is NaN, return zero.
								//
								// Zero could be interpreted as a rest/silence.
								if ( isNaN( marimbaNote ) ) {
									marimbaNote = 0;
								}

								marimbaNotes.push( marimbaNote );

							} );

							console.au( 'The notes for this repo are:' );
							console.table( marimbaNotes );

							return marimbaNotes;
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

						musicalChars.notes.marimba();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbmdvbGQudXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6cEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImpRdWVyeSggZG9jdW1lbnQgKS5yZWFkeSggZnVuY3Rpb24oICQgKSB7XG5cblx0J3VzZSBzdHJpY3QnXG5cblx0LyoqXG5cdCAqIENvbG9yIGNoYW5nZXJzLlxuXHQgKi9cblxuXHR2YXIgYmdjb2xvcnMgPSBbXG5cdFwiI0YzRjMxNVwiLFxuXHRcIiNDMUZEMzNcIixcblx0XCIjRkY5OTMzXCIsXG5cdFwiI0ZDNUFCOFwiLFxuXHRcIiMwREQ1RkNcIixcblx0XCJncmV5XCIsXG5cdFwiYXF1YVwiLFxuXHRcImNvcm5mbG93ZXJcIixcblx0XCJzYWxtb25cIixcblx0XCJvcmFuZ2VcIixcblx0XCJibGFja1wiLFxuXHRcInB1cnBsZVwiLFxuXHRcInBpbmtcIlxuXHRdO1xuXG5cdGZ1bmN0aW9uIGNoYW5nZUJnQ29sb3IoKSB7XG5cdFx0dmFyIGVsX2JvZHkgPSAkKCAnYm9keScgKTtcblx0XHRlbF9ib2R5LmNzcyggJ2JhY2tncm91bmQtY29sb3InLCBiZ2NvbG9yc1sgTWF0aC5mbG9vciggKCBNYXRoLnJhbmRvbSgpICogOCApICsgMSApIF0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZU51bWJlckNvbG9yKCkge1xuXHRcdHZhciBlbF9udW1iZXIgPSAkKCAnLm51bWJlcicgKTtcblx0XHRlbF9udW1iZXIuY3NzKCAnY29sb3InLCByZWRzWyBNYXRoLmZsb29yKCAoIE1hdGgucmFuZG9tKCkgKiA0ICkgKyAxICkgXSApO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlQmx1ZUNvbG9yKCkge1xuXHRcdHZhciBlbF9ibHVlID0gJCggJy5ibHVlQm94JyApO1xuXHRcdGVsX2JsdWUuY3NzKCAnYmFja2dyb3VuZC1jb2xvcicsIGJsdWVzWyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYmx1ZXMubGVuZ3RoICkgXSApO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hhbmdlWWVsbG93Q29sb3IoKSB7XG5cdFx0dmFyIGVsX3llbGxvdyA9ICQoICcueWVsbG93Qm94JyApO1xuXHRcdGVsX3llbGxvdy5jc3MoICdiYWNrZ3JvdW5kLWNvbG9yJywgeWVsbG93c1sgTWF0aC5mbG9vciggKCBNYXRoLnJhbmRvbSgpICogOCApICsgMSApIF0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW5kZXJzIHRoZSBpbml0aWFsLCBzaW5lIHdhdmUgdmlzdWFsaXphdGlvbi5cblx0ICpcblx0ICogRGVmaW5lZCBlYXJseSBzbyBpdCBjYW4gYmUgbWFuaXB1bGF0ZWQgYnkgVG9uZS5qcyBsYXRlci5cblx0ICovXG5cblx0Lypcblx0ICogVXNlcyBzaW5lLXdhdmVzIGxpYlxuXHQgKi9cblxuXHR2YXIgd2F2ZXMgPSBuZXcgU2luZVdhdmVzKCB7XG5cdFx0ZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcud2F2ZXMnICksXG5cblx0XHRzcGVlZDogNCxcblxuXHRcdHdpZHRoOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiAkKCB3aW5kb3cgKS53aWR0aCgpO1xuXHRcdH0sXG5cblx0XHRoZWlnaHQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuICQoIHdpbmRvdyApLmhlaWdodCgpO1xuXHRcdH0sXG5cblx0XHRlYXNlOiAnU2luZUluT3V0JyxcblxuXHRcdHdhdmVzV2lkdGg6ICc3MCUnLFxuXG5cdFx0d2F2ZXM6IFtcblx0XHRcdHtcblx0XHRcdFx0dGltZU1vZGlmaWVyOiA0LFxuXHRcdFx0XHRsaW5lV2lkdGg6IDEsXG5cdFx0XHRcdGFtcGxpdHVkZTogLTI1LFxuXHRcdFx0XHR3YXZlbGVuZ3RoOiAyNVxuICAgIH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpbWVNb2RpZmllcjogMixcblx0XHRcdFx0bGluZVdpZHRoOiAyLFxuXHRcdFx0XHRhbXBsaXR1ZGU6IC01MCxcblx0XHRcdFx0d2F2ZWxlbmd0aDogNTBcbiAgICB9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aW1lTW9kaWZpZXI6IDEsXG5cdFx0XHRcdGxpbmVXaWR0aDogMSxcblx0XHRcdFx0YW1wbGl0dWRlOiAtMTAwLFxuXHRcdFx0XHR3YXZlbGVuZ3RoOiAxMDBcbiAgICB9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aW1lTW9kaWZpZXI6IDAuNSxcblx0XHRcdFx0bGluZVdpZHRoOiAxLFxuXHRcdFx0XHRhbXBsaXR1ZGU6IC0yMDAsXG5cdFx0XHRcdHdhdmVsZW5ndGg6IDIwMFxuICAgIH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpbWVNb2RpZmllcjogMC4yNSxcblx0XHRcdFx0bGluZVdpZHRoOiAyLFxuXHRcdFx0XHRhbXBsaXR1ZGU6IC00MDAsXG5cdFx0XHRcdHdhdmVsZW5ndGg6IDQwMFxuICAgIH1cbiAgXSxcblxuXHRcdC8vIENhbGxlZCBvbiB3aW5kb3cgcmVzaXplXG5cdFx0Ly8gQHRvZG8gV2Ugc2hvdWxkIGNoZWNrIGlmIHRoaXMgbmVlZHMgdG8gYmUgZGVib3VuY2VkXG5cdFx0cmVzaXplRXZlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGdyYWRpZW50ID0gdGhpcy5jdHguY3JlYXRlTGluZWFyR3JhZGllbnQoIDAsIDAsIHRoaXMud2lkdGgsIDAgKTtcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCggMCwgXCJyZ2JhKDIzLCAyMTAsIDE2OCwgMC4yKVwiICk7XG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoIDAuNSwgXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSlcIiApO1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKCAxLCBcInJnYmEoMjMsIDIxMCwgMTY4LCAwLjIpXCIgKTtcblxuXHRcdFx0dmFyIGluZGV4ID0gLTE7XG5cdFx0XHR2YXIgbGVuZ3RoID0gdGhpcy53YXZlcy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoICsraW5kZXggPCBsZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMud2F2ZXNbIGluZGV4IF0uc3Ryb2tlU3R5bGUgPSBncmFkaWVudDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xlYW4gVXBcblx0XHRcdGluZGV4ID0gdm9pZCAwO1xuXHRcdFx0bGVuZ3RoID0gdm9pZCAwO1xuXHRcdFx0Z3JhZGllbnQgPSB2b2lkIDA7XG5cdFx0fVxuXHR9ICk7XG5cblxuXHQvKipcblx0ICogR2V0IHVzZXIgaW5wdXRcblx0ICpcblx0ICogQHR5cGUge1t0eXBlXX1cblx0ICovXG5cblx0LyoqXG5cdCAqIE9uIGNsaWNrXG5cdCAqXG5cdCAqIEBzaW5jZSAgW3NpbmNlXVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtbdHlwZV19IGV2ZW50XG5cdCAqXG5cdCAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuXHQgKi9cblx0JCggJ2J1dHRvbicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dmFyIHVzZXJPck9yZyA9ICQoICdpbnB1dC51c2VyLW9yLW9yZycgKS52YWwoKTtcblx0XHR2YXIgcmVwb05hbWUgPSAkKCAnaW5wdXQucmVwby1uYW1lJyApLnZhbCgpO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHQvLyBjb25zb2xlLnRhYmxlKCB1c2VyT3JPcmcsIHJlcG9OYW1lICk7XG5cblx0fSApO1xuXG5cdC8qKlxuXHQgKiBHZXQgdGhlaXIgR2l0aHViIEFQSSB2MyBmZWVkXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBHaXRodWIgQVBJIHYzIGpzb25wIGlzIHJldHVybmVkIGluIHRoZSBmb3JtYXQgb2Y6XG5cdCAqIGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvPHVzZXIgb3Igb3JnYW5pemF0aW9uPi88bmFtZSBvZiByZXBvc2l0b3J5Pi9jb21taXRzP2NhbGxiYWNrPXJlcG9cblx0ICogKHdpdGggdGhlIGNhbGxiYWNrIHZhbHVlIGJlaW5nIHRoZSBqc29ucCBwYXlsb2FkKVxuXHQgKi9cblx0dmFyIHVzZXJPck9yZ0V4YW1wbGUgPSAnY29tbW9uLWdvbGQnO1xuXHR2YXIgcmVwb05hbWVFeGFtcGxlID0gJ211c2ljYWxDaGFycyc7XG5cdHZhciByZXBvVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJyArIHVzZXJPck9yZ0V4YW1wbGUgKyAnLycgKyByZXBvTmFtZUV4YW1wbGUgKyAnL2NvbW1pdHM/Y2FsbGJhY2s9cmVwbyc7XG5cblx0JC5hamF4KCB7XG5cdFx0dXJsOiByZXBvVVJMLFxuXHRcdGRhdGFUeXBlOiAnanNvbnAnLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCByZXBvICkge1xuXG5cdFx0XHRcdGlmICggIXJlcG8uZGF0YSApIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBpZiAoIHVuZGVmaW5lZCA9PT0gcmVwby5kYXRhIHx8IHJlcG8ubWVzc2FnZS5pbmRleE9mKCAnQVBJIHJhdGUgbGltaXQgZXhjZWVkZWQnICkgPj0gMCApIHtcblx0XHRcdFx0Ly8gXHQvLyBTaG91bGQgd2UgYWRkIGluIGF1dGg/IFRoaXMgaXMgZ29pbmcgdG8gZ2V0IHJlYWxseSBhbm5veWluZy4uLlxuXHRcdFx0XHQvLyBcdGNvbnNvbGUuYXUoICdBdyBzaGl0LCB5b3UgaGl0IHRoZSBHaXRodWIgYXVuYXV0aGVudGljYXRlZCBBUEkgdXNhZ2UgcmF0ZSBsaW1pdC4gSXQgc2hvdWxkIHJlc2V0IGluIGEgZmV3IG1pbnV0ZXMuJyApO1xuXHRcdFx0XHQvLyBcdHJldHVybjtcblx0XHRcdFx0Ly8gfVxuXG5cdFx0XHRcdC8vIGNvbnNvbGUuYXUoICdSZXBvc2l0b3J5IGRhdGE6JyApO1xuXHRcdFx0XHQvLyBjb25zb2xlLnRhYmxlKCByZXBvLmRhdGEgKTtcblxuXHRcdFx0XHR2YXIgbGVuID0gcmVwby5sZW5ndGg7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFBhcnNlIGpzb25wIGFuZCBjYWxjdWF0ZSB2YXJpb3VzIGFyYml0cmFyeSBtdXNpY2FsIHByb3BlcnRpZXMsIGFuZCBhc3NpZ24gdGhlbSB0byB0aGUgcmVwb011c2ljIG9iamVjdC5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogQHRvZG9cblx0XHRcdFx0ICovXG5cblx0XHRcdFx0dmFyIG11c2ljYWxDaGFycyA9IHtcblx0XHRcdFx0XHRicG06IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGNhbGNCUE0gPSAxMjA7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2FsY0JQTTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRpbWVTaWduYXR1cmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Ly8gQHRvZG8gLSBjYWxjdWxhdGUgdGltZSBzaWduYXR1cmUgYmFzZWQgb24gIyBvZiBjb21taXRzICsgY29udHJpYnV0b3JzP1xuXHRcdFx0XHRcdFx0aWYgKCByZXBvLmRhdGEuY29tbWl0Lm1lc3NhZ2UubGVuZ3RoID4gNSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgNCwgNCBdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggcmVwby5kYXRhLmNvbW1pdC5sZW5ndGggPiA1MCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgMywgNCBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZHVyYXRpb246IHJlcG8ubGVuZ3RoICogMTAwLFxuXHRcdFx0XHRcdGtleTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdC8vIFNvbmcgaXMgaW4gdGhlIGtleSBvZiBDIGJ5IGRlZmF1bHRcblx0XHRcdFx0XHRcdHZhciBkZWZhdWx0S2V5ID0gJ2MnO1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgZmlyc3QgY29tbWl0IGZyb20gdGhlIGpzb25wXG5cdFx0XHRcdFx0XHR2YXIgY2hhciA9IHJlcG8uZGF0YVsgMCBdLmNvbW1pdC5tZXNzYWdlLnN1YnN0ciggMCwgMSApO1xuXG5cdFx0XHRcdFx0XHRpZiAoIGNoYXIgPT0gJ2EnIHx8IGNoYXIgPT0gJ0EnIHx8IGNoYXIgPT0gJzEnICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2EnO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggY2hhciA9PSAnYicgfHwgY2hhciA9PSAnQicgfHwgY2hhciA9PSAnMicgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAnYic7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjaGFyID09ICdjJyB8fCBjaGFyID09ICdDJyB8fCBjaGFyID09ICczJyApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICdjJztcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGNoYXIgPT0gJ2QnIHx8IGNoYXIgPT0gJ0QnIHx8IGNoYXIgPT0gJzQnICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2QnO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggY2hhciA9PSAnZScgfHwgY2hhciA9PSAnRScgfHwgY2hhciA9PSAnNScgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAnZSc7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjaGFyID09ICdmJyB8fCBjaGFyID09ICdGJyB8fCBjaGFyID09ICc2JyApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICdmJztcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGNoYXIgPT0gJ2cnIHx8IGNoYXIgPT0gJ0cnIHx8IGNoYXIgPT0gJzcnICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ2EnO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBAdG9kbzogc29tZSBhcmJpdHJhcnkgYXNzaWdubWVudCBvbiB0aGVzZSByZW1haW5pbmcgY2hhcmFjdGVyIHBvc3NpYmxlcy5cblx0XHRcdFx0XHRcdFx0dmFyIHBsZWJzID0gWyAnaCcsICdpJywgJ2onLCAnaycsICdsJywgJ20nLCAnbicsICdvJywgJ3AnLCAncScsICdyJywgJ3MnLCAndCcsICd1JywgJ3YnLCAndycsICd4JywgJ3knLCAneicsICdIJywgJ0knLCAnSicsICdLJywgJ0wnLCAnTScsICdOJywgJ08nLCAnUCcsICdRJywgJ1InLCAnUycsICdUJywgJ1UnLCAnVicsICdXJywgJ1gnLCAnWScsICdaJywgJzgnLCAnOScsICcwJyBdO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBkZWZhdWx0S2V5O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aXNNaW5vcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQvLyBIb3cgc2hvdWxkIGEgbWFqb3Igb3IgbWlub3Iga2V5IGJlIGRldGVybWluZWQ/XG5cdFx0XHRcdFx0XHQvLyBQZXJoYXBzIHNlYXJjaGluZyBmb3IgY2VydGFpbiBrZXl3b3JkcywgZWdcblx0XHRcdFx0XHRcdC8vIGEgaGlnaCBpc3RhbmNlIG9mIHByb2Zhbml0eSBpbiBjb21taXQgbWVzc2FnZXMgd291bGQgYmUgYSBtaW5vciBrZXkuLi5cblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHQvLyBAdG9kb1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bWFqb3JNaW5vcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHRydWUgPT09IG11c2ljYWxDaGFycy5pc01pbm9yICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJ21pbm9yJztcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAnbWFqb3InO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBoYXBweSBieSBkZWZhdWx0IDotKVxuXHRcdFx0XHRcdFx0cmV0dXJuICdtYWpvcic7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRoYXNTcGVlY2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICggJ3NwZWVjaFN5bnRoZXNpcycgaW4gd2luZG93ICkgPyB0cnVlIDogZmFsc2U7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRoYXNEcnVtczogdHJ1ZSxcblx0XHRcdFx0XHRoYXNNYXJpbWJhOiB0cnVlLFxuXHRcdFx0XHRcdGhhc0Jhc3M6IHRydWUsXG5cdFx0XHRcdFx0aGFzRmx1dGU6IHRydWUsXG5cdFx0XHRcdFx0aGFzUGlhbm86IHRydWUsXG5cdFx0XHRcdFx0aGFzU3F1YXJlOiB0cnVlLFxuXHRcdFx0XHRcdGhhc1Nhd3Rvb3RoOiB0cnVlLFxuXHRcdFx0XHRcdGx5cmljczoge1xuXHRcdFx0XHRcdFx0dmVyc2VzOiB7XG5cdFx0XHRcdFx0XHRcdC8vIHZlcnNlcyB3aWxsIGJlIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlhIGEgbG9vcCBJIGd1ZXNzP1xuXHRcdFx0XHRcdFx0XHQndGVtcCc6ICdub3QnLFxuXHRcdFx0XHRcdFx0XHQnZG9uZSc6ICd5ZXQnXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0dmVyc2UxOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoICFtdXNpY2FsQ2hhcnMuaGFzU3BlZWNoKCkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdubyBzcGVlY2gnICk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoIHJlcG8uZGF0YVsgMCBdLmNvbW1pdC5tZXNzYWdlICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXBvLmRhdGFbIDAgXS5jb21taXQubWVzc2FnZTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvciggJ05vIGNvbW1pdCBtZXNzYWdlcyB3ZXJlIGZvdW5kLicgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dm9jYWxzOiB7XG5cdFx0XHRcdFx0XHQvLyBQbGFuIGlzIHRvIHRyeSB0byBtYXRjaCB0aGUgcmVsYXRpdmUgcGl0Y2ggdG8gdGhlIGtleSB0aGUgbXVzaWMgaXMgaW4uXG5cdFx0XHRcdFx0XHRwaXRjaDogLjYsXG5cdFx0XHRcdFx0XHQvLyBBZGp1c3QgcmF0ZSBiYXNlZCBvbiB0aGUgYnBtIHZhbHVlIG9mIHRoZSBzb25nLlxuXHRcdFx0XHRcdFx0cmF0ZTogLjVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG5vdGVzOiB7XG5cdFx0XHRcdFx0XHRkcnVtczogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdG1hcmltYmE6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE5vdGVzIGNhbiBiZSBvbmUgb2YgMjQgdG9uYWxseS11bmlxdWUga2V5czpcblx0XHRcdFx0XHRcdFx0Ly8gQzsgRGIoL0MjKTsgRDsgRWIoL0QjKTsgRTsgRjsgRiMvR2I7IEc7IEFiKC9HIyk7IEE7IEJiKC9BIyk7IEJcblxuXHRcdFx0XHRcdFx0XHR2YXIgbWFyaW1iYU5vdGVzID0gW107XG5cblx0XHRcdFx0XHRcdFx0JC5lYWNoKCByZXBvLmRhdGEsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBjb21taXQgc2hhIGhhc2ggZm9yIGVhY2ggY29tbWl0LCBwYXJzZSBpdCBhcyBiYXNlIDE2LCBhbmQgcm91bmQgaXQgdG8gdGhlIG5lYXJlc3QgaW50LlxuXHRcdFx0XHRcdFx0XHRcdHZhciBtYXJpbWJhTm90ZSA9IE1hdGgucm91bmQoIHBhcnNlSW50KCB0aGlzLmNvbW1pdC50cmVlLnNoYSwgMTAgKSApO1xuXHRcdFx0XHRcdFx0XHRcdG1hcmltYmFOb3RlID0gTWF0aC5yb3VuZCggbWFyaW1iYU5vdGUgKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoZSB2YWx1ZSByZXR1cm5lZCBpcyBOYU4sIHJldHVybiB6ZXJvLlxuXHRcdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRcdFx0Ly8gWmVybyBjb3VsZCBiZSBpbnRlcnByZXRlZCBhcyBhIHJlc3Qvc2lsZW5jZS5cblx0XHRcdFx0XHRcdFx0XHRpZiAoIGlzTmFOKCBtYXJpbWJhTm90ZSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFyaW1iYU5vdGUgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdG1hcmltYmFOb3Rlcy5wdXNoKCBtYXJpbWJhTm90ZSApO1xuXG5cdFx0XHRcdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmF1KCAnVGhlIG5vdGVzIGZvciB0aGlzIHJlcG8gYXJlOicgKTtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS50YWJsZSggbWFyaW1iYU5vdGVzICk7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1hcmltYmFOb3Rlcztcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRiYXNzOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Zmx1dGU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRwaWFubzogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHNhd3Rvb3Rod2F2ZTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHNxdWFyZXdhdmU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHVpOiB7XG5cdFx0XHRcdFx0XHRidXR0b246IGZ1bmN0aW9uKCBidXR0b25UZXh0LCBidXR0b25DbGFzcyApIHtcblx0XHRcdFx0XHRcdFx0Ly8gQHRvZG8gZGVmaW5lIGFwcGVuZCBiZWhhdmlvciBjb25kaXRpb25zIHZpYSBzd2l0Y2ggb3Igc29tZXRoaW5nXG5cdFx0XHRcdFx0XHRcdHJldHVybiAnPGJ1dHRvbiBjbGFzcz1cIicgKyBidXR0b25DbGFzcyArICdcIj4nICsgYnV0dG9uVGV4dCArICc8YnV0dG9uPic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JCggJy5vdXQgaDInICkuaHRtbCggJzxzcGFuIGNsYXNzPVwidGl0bGVcIj4nICsgcmVwb05hbWVFeGFtcGxlICsgJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJrZXktc3VidGl0bGVcIj5pbiA8c3BhbiBjbGFzcz1cImtleVwiPicgKyBtdXNpY2FsQ2hhcnMua2V5KCkgKyAnPC9zcGFuPiAnICsgbXVzaWNhbENoYXJzLm1ham9yTWlub3IoKSArICc8L3NwYW4+JyApO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRtdXNpY2FsQ2hhcnMucmVuZGVyKCk7XG5cblx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0ICogU3RhcnQgdXAgc3BlZWNoIHN5bnRoZXNpcyBlbmdpbmUuXG5cdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0ICogQHR5cGUge1t0eXBlXX1cblx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0dmFyIHZvaWNlcyA9IHNwZWVjaFN5bnRoZXNpcy5nZXRWb2ljZXMoKTtcblxuXHRcdFx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggb2YgdGhlIHZvaWNlcy5cblx0XHRcdFx0XHRcdHZvaWNlcy5mb3JFYWNoKCBmdW5jdGlvbiggdm9pY2UsIGkgKSB7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHZvaWNlTmFtZSA9IHZvaWNlLm5hbWU7XG5cblx0XHRcdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRcdFx0bXVzaWNhbENoYXJzLm5vdGVzLm1hcmltYmEoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdG11c2ljYWxDaGFycy5pbml0KCk7XG5cblx0XHRcdFx0Ly8gQ2hyb21lIGxvYWRzIHZvaWNlcyBhc3luY2hyb25vdXNseS5cblx0XHRcdFx0d2luZG93LnNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgPSBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0XHRtdXNpY2FsQ2hhcnMuaW5pdCgpO1xuXHRcdFx0XHR9O1xuXG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IHV0dGVyYW5jZSBmb3IgdGhlIHNwZWNpZmllZCB0ZXh0IGFuZCBhZGQgaXQgdG9cblx0XHRcdFx0Ly8gdGhlIHF1ZXVlLlxuXHRcdFx0XHRmdW5jdGlvbiBzcGVhayggdGV4dCApIHtcblx0XHRcdFx0XHQvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlLlxuXHRcdFx0XHRcdHZhciBtc2cgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCk7XG5cblx0XHRcdFx0XHQvLyBTZXQgdGhlIHZlcnNlLlxuXHRcdFx0XHRcdG1zZy50ZXh0ID0gbXVzaWNhbENoYXJzLmx5cmljcy52ZXJzZTEoKTtcblxuXHRcdFx0XHRcdC8vIFNldCB0aGUgYXR0cmlidXRlcy5cblx0XHRcdFx0XHRtc2cudm9sdW1lID0gcGFyc2VGbG9hdCggOSApO1xuXHRcdFx0XHRcdG1zZy5yYXRlID0gcGFyc2VGbG9hdCggbXVzaWNhbENoYXJzLnZvY2Fscy5yYXRlICk7XG5cdFx0XHRcdFx0bXNnLnBpdGNoID0gcGFyc2VGbG9hdCggbXVzaWNhbENoYXJzLnZvY2Fscy5waXRjaCApO1xuXG5cdFx0XHRcdFx0Ly8gSWYgYSB2b2ljZSBoYXMgYmVlbiBzZWxlY3RlZCwgZmluZCB0aGUgdm9pY2UgYW5kIHNldCB0aGVcblx0XHRcdFx0XHQvLyB1dHRlcmFuY2UgaW5zdGFuY2UncyB2b2ljZSBhdHRyaWJ1dGUuXG5cdFx0XHRcdFx0Ly8gaWYgKCB2b2ljZVNlbGVjdC52YWx1ZSApIHtcblx0XHRcdFx0XHQvLyBcdHZlcnNlLnZvaWNlID0gc3BlZWNoU3ludGhlc2lzLmdldFZvaWNlcygpLmZpbHRlciggZnVuY3Rpb24oIHZvaWNlICkge1xuXHRcdFx0XHRcdC8vIFx0XHRyZXR1cm4gdm9pY2UubmFtZSA9PSB2b2ljZVNlbGVjdC52YWx1ZTtcblx0XHRcdFx0XHQvLyBcdH0gKVsgMCBdO1xuXHRcdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRcdC8vIFF1ZXVlIHRoaXMgdXR0ZXJhbmNlLlxuXHRcdFx0XHRcdHdpbmRvdy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoIG1zZyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFZvY2Fsc1xuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBKdXN0IHRoZSBleGFtcGxlIGlzIHByZXNlbnRseSBkZWZpbmVkLlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0c3BlYWsoIG11c2ljYWxDaGFycy5seXJpY3MudmVyc2UxKCkgKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogTXVzaWNcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogTm93IHdlIGNyZWF0ZSBtdXNpYyBmcm9tIHRoZSByZXBvTXVzaWMgdmFsdWVzLCB1c2luZyBUb25lLmpzLlxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBJbnN0cnVtZW50czpcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogZHJ1bXNcblx0XHRcdFx0ICogbWFyaW1iYVxuXHRcdFx0XHQgKiBiYXNzXG5cdFx0XHRcdCAqIGZsdXRlXG5cdFx0XHRcdCAqIHBpYW5vXG5cdFx0XHRcdCAqIHNxdWFyZXdhdmVcblx0XHRcdFx0ICogc2F3dG9vdGggd2F2ZVxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKi9cblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBEcnVtc1xuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBSZWFsbHkganVzdCBhIHNuYXJlLlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIHNuYXJlID0gbmV3IFRvbmUuTm9pc2VTeW50aCgge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0xMCxcblx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDAxLFxuXHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJmaWx0ZXJFbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC4xLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cblx0XHRcdFx0dmFyIHNuYXJlUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lICkge1xuXHRcdFx0XHRcdHNuYXJlLnRyaWdnZXJBdHRhY2soIHRpbWUgKTtcblx0XHRcdFx0XHRjaGFuZ2VOdW1iZXJDb2xvcigpO1xuXHRcdFx0XHRcdGNoYW5nZUJsdWVDb2xvcigpO1xuXHRcdFx0XHRcdCQoICcuYnV0dG9uJyApLnRvZ2dsZUNsYXNzKCAncGxheWluZycgKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLmRydW1zICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogIE1hcmltYmFcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNNYXJpbWJhID0gbmV3IFRvbmUuUG9seVN5bnRoKCA0LCBUb25lLlN5bnRoLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTUsXG5cdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwicGFydGlhbHNcIjogWyAxLCAwLCAyLCAwLCAzIF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDAxLFxuXHRcdFx0XHRcdFx0XCJkZWNheVwiOiAxLjIsXG5cdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMCxcblx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpXG5cblx0XHRcdFx0dmFyIGluc01hcmltYmFfcGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXG5cdFx0XHRcdFx0aW5zTWFyaW1iYS50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI4blwiLCB0aW1lICk7XG5cblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLm1hcmltYmEgKS5zdGFydCgpO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIEJhc3Ncblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNCYXNzID0gbmV3IFRvbmUuUG9seVN5bnRoKCA0LCBUb25lLlNpbXBsZUZNLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTMsXG5cdFx0XHRcdFx0XCJoYXJtb25pY2l0eVwiOiAzLjAxLFxuXHRcdFx0XHRcdFwibW9kdWxhdGlvbkluZGV4XCI6IDE0LFxuXHRcdFx0XHRcdFwiY2FycmllclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJzYXd0b290aDZcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMSxcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJtb2R1bGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwidHJpYW5nbGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAxLFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMixcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDAuMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApLnRvTWFzdGVyKCk7XG5cblx0XHRcdFx0dmFyIGJhc3NQYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zQmFzcy50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdFx0Y2hhbmdlQmdDb2xvcigpO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMuYmFzcyApLnN0YXJ0KCAwICk7XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogRmx1dGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNGbHV0ZSA9IG5ldyBUb25lLlBvbHlTeW50aCggNCwgVG9uZS5TaW1wbGVGTSwge1xuXHRcdFx0XHRcdFwidm9sdW1lXCI6IC0zLFxuXHRcdFx0XHRcdFwiaGFybW9uaWNpdHlcIjogMy4wMSxcblx0XHRcdFx0XHRcIm1vZHVsYXRpb25JbmRleFwiOiAxNCxcblx0XHRcdFx0XHRcImNhcnJpZXJcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwidHJpYW5nbGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZW52ZWxvcGVcIjoge1xuXHRcdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjA1LFxuXHRcdFx0XHRcdFx0XHRcImRlY2F5XCI6IDAuNSxcblx0XHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAuMSxcblx0XHRcdFx0XHRcdFx0XCJyZWxlYXNlXCI6IDEuMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJtb2R1bGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic3F1YXJlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wMSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjIsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAwLjFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKS50b01hc3RlcigpO1xuXG5cdFx0XHRcdHZhciBmbHV0ZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNGbHV0ZS50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdFx0Y2hhbmdlWWVsbG93Q29sb3IoKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLmZsdXRlICkuc3RhcnQoIDAgKTtcblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBQYXJ0IDUgLSBwaWFub1xuXHRcdFx0XHQgKi9cblx0XHRcdFx0dmFyIGluc1BpYW5vID0gbmV3IFRvbmUuUG9seVN5bnRoKCAyLCBUb25lLlN5bnRoLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTguNzUsXG5cdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwicGFydGlhbHNcIjogW1xuXHRcdFx0ICAgMzEsXG5cdFx0XHQgICAyMyxcblx0XHRcdCAgIDMsXG5cdFx0XHQgICA1LFxuXHRcdFx0ICAgNSxcblx0XHRcdCAgIDFcblx0XHRcdFx0XVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcImF0dGFja1wiOiAwLjAwMSxcblx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMS4xLFxuXHRcdFx0XHRcdFx0XCJzdXN0YWluXCI6IDAsXG5cdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC42XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgcGlhbm9QYXJ0ID0gbmV3IFRvbmUuUGFydCggZnVuY3Rpb24oIHRpbWUsIG5vdGUgKSB7XG5cdFx0XHRcdFx0aW5zUGlhbm8udHJpZ2dlckF0dGFja1JlbGVhc2UoIG5vdGUsIFwiMW5cIiwgdGltZSApO1xuXHRcdFx0XHR9LCBtdXNpY2FsQ2hhcnMubm90ZXMucGlhbm8gKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIFNhd3Rvb3RoIHdhdmUgc3ludGhcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNTYXd0b290aHdhdmUgPSBuZXcgVG9uZS5Qb2x5U3ludGgoIDIsIFRvbmUuU2ltcGxlRk0sIHtcblx0XHRcdFx0XHRcInZvbHVtZVwiOiAtMSxcblx0XHRcdFx0XHRcImhhcm1vbmljaXR5XCI6IDMuMDEsXG5cdFx0XHRcdFx0XCJtb2R1bGF0aW9uSW5kZXhcIjogMTQsXG5cdFx0XHRcdFx0XCJjYXJyaWVyXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNhd3Rvb3RoNlwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4xLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMS4yXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcIm1vZHVsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcIm9zY2lsbGF0b3JcIjoge1xuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJ0cmlhbmdsZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4yLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC4xXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgc2F3dG9vdGh3YXZlUGFydCA9IG5ldyBUb25lLlBhcnQoIGZ1bmN0aW9uKCB0aW1lLCBub3RlICkge1xuXHRcdFx0XHRcdGluc1Nhd3Rvb3R3YXZlaC50cmlnZ2VyQXR0YWNrUmVsZWFzZSggbm90ZSwgXCI0blwiLCB0aW1lICk7XG5cdFx0XHRcdH0sIG11c2ljYWxDaGFycy5ub3Rlcy5zYXd0b290aHdhdmUgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIFBhcnQgNiAtIHNxdWFyZXdhdmVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHZhciBpbnNTcXVhcmV3YXZlID0gbmV3IFRvbmUuUG9seVN5bnRoKCAzLCBUb25lLlNpbXBsZUZNLCB7XG5cdFx0XHRcdFx0XCJ2b2x1bWVcIjogLTEyLFxuXHRcdFx0XHRcdFwiaGFybW9uaWNpdHlcIjogMy4wMSxcblx0XHRcdFx0XHRcIm1vZHVsYXRpb25JbmRleFwiOiAxNCxcblx0XHRcdFx0XHRcImNhcnJpZXJcIjoge1xuXHRcdFx0XHRcdFx0XCJvc2NpbGxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwic3F1YXJlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImVudmVsb3BlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhdHRhY2tcIjogMC4wNSxcblx0XHRcdFx0XHRcdFx0XCJkZWNheVwiOiAwLjUsXG5cdFx0XHRcdFx0XHRcdFwic3VzdGFpblwiOiAwLjEsXG5cdFx0XHRcdFx0XHRcdFwicmVsZWFzZVwiOiAxLjJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwibW9kdWxhdG9yXCI6IHtcblx0XHRcdFx0XHRcdFwib3NjaWxsYXRvclwiOiB7XG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcInNxdWFyZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJlbnZlbG9wZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYXR0YWNrXCI6IDAuMDEsXG5cdFx0XHRcdFx0XHRcdFwiZGVjYXlcIjogMC41LFxuXHRcdFx0XHRcdFx0XHRcInN1c3RhaW5cIjogMC4yLFxuXHRcdFx0XHRcdFx0XHRcInJlbGVhc2VcIjogMC4xXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkudG9NYXN0ZXIoKTtcblxuXHRcdFx0XHR2YXIgc3F1YXJld2F2ZVBhcnQgPSBuZXcgVG9uZS5QYXJ0KCBmdW5jdGlvbiggdGltZSwgbm90ZSApIHtcblx0XHRcdFx0XHRpbnNTcXVhcmV3YXZlLnRyaWdnZXJBdHRhY2tSZWxlYXNlKCBub3RlLCBcIjRuXCIsIHRpbWUgKTtcblx0XHRcdFx0fSwgbXVzaWNhbENoYXJzLm5vdGVzLnNxdWFyZXdhdmUgKS5zdGFydCggMCApO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBRdWV1ZSB1cCBUb25lLmpzLCBzZXQgZ2xvYmFsIHZhbHVlcyBmcm9tIEdpdGh1YiByZXBvIGRhdGEuXG5cdFx0XHRcdCAqL1xuXG5cdFx0XHRcdC8vIFNldCB0aGUgdGltZSBzaWduYXR1cmVcblx0XHRcdFx0VG9uZS5UcmFuc3BvcnQudGltZVNpZ25hdHVyZSA9IFsgNCwgNCBdO1xuXHRcdFx0XHQvL3NldCB0aGUgdHJhbnNwb3J0XG5cdFx0XHRcdFRvbmUuVHJhbnNwb3J0LmJwbS52YWx1ZSA9IDE2MDtcblx0XHRcdFx0VG9uZS5UcmFuc3BvcnQubG9vcCA9IHRydWU7XG5cblx0XHRcdH0gLy8gVGhpcyBjb25jbHVkZXMgb3VyIGFqYXhcblx0fSApXG5cbn0gKTtcbiIsIi8qKlxuICogSGVscGZ1bCB1dGlsaXRpZXMgZm9yIHByb2plY3RzXG4gKlxuICogQHR5cGUge09iamVjdH0gY29tbW9uQVUgb2JqZWN0XG4gKi9cbnZhciBjb21tb25BVSA9IHtcbiAgZGVidWdnZXI6IGZ1bmN0aW9uKCBlcnJvck1lc3NhZ2UgKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgcmV0dXJuICdDb21tb24gR29sZDogJyArICdcXG4nICsgZXJyb3JNZXNzYWdlO1xuICAgIGRlYnVnZ2VyO1xuICB9LFxuICBkZWJ1ZzogZmFsc2Vcbn1cblxuLyoqXG4gKiBBIGNvbnNvbGUuZXJyb3IgcHJvdG90eXBlXG4gKlxuICogLSBDYWxsYWJsZSB3aXRoIGBjb25zb2xlLmNvbW1vbkFVKCBcIlRoZSBlcnJvclwiIClgXG4gKlxuICogQHNpbmNlICAwLjFcbiAqXG4gKiBAcmV0dXJuIHtbY29uc29sZS5lcnJvciBvYmplY3RdfSBbRXJyb3Igb2JqZWN0IGFuZCBlcnJvciBtZXNzYWdlIHN0cmluZ11cbiAqL1xuXG5cbnZhciBhdUNvbnNvbGVTdHlsZXMgPSBbXG4gICAgJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChnb2xkLCBnb2xkZW5yb2QpJ1xuICAgICwgJ2JvcmRlcjogNnB4IHNvbGlkIGdvbGQnXG4gICAgLCAnY29sb3I6IGJsYWNrJ1xuICAgICwgJ2Rpc3BsYXk6IGJsb2NrJ1xuICAgICwgJ2xpbmUtaGVpZ2h0OiAyNHB4J1xuICAgICwgJ3RleHQtYWxpZ246IGxlZnQnXG4gICAgLCAnbWFyZ2luOiA0cHgnXG4gICAgLCAnZm9udC13ZWlnaHQ6IGJvbGQnXG5dLmpvaW4oICc7JyApO1xuXG5jb25zb2xlLmF1ID0gZnVuY3Rpb24oIG1lc3NhZ2UgKSB7XG4gIGNvbnNvbGUubG9nKCAnJWMnICsgJyAqIENvbW1vbi5hdTogJyArIG1lc3NhZ2UsIGF1Q29uc29sZVN0eWxlcyArICcgKicgKTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
