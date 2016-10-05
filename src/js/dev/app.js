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
						if ( musicalChars.isMinor ) {
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
						$( '.out h2' ).html( repoNameExample + ' in ' + musicalChars.key() + ' ' + musicalChars.majorMinor() );
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
