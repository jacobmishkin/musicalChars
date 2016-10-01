jQuery( document ).ready( function( $ ) {

	'use strict'

	/**
	 * First you get the val
	 */

	var userOrOrg = $( 'input.user-or-org' ).val();
	var repoName = $( 'input.repo-name' ).val();

	$( 'button' ).on( 'click', function( event ) {
		event.preventDefault();
		console.table( userOrOrg, repoName )
	} );

	/**
	 * The you get the feed
	 */

	/**
	 * Github API v3 jsonp is returned in the format of:
	 * https://api.github.com/repos/<user or organization>/<name of repository>/commits?callback=repo
	 * (with the callback value being the jsonp payload)
	 */
	var userOrOrgExample = 'common-gold';
	var repoNameExample = 'musical-chars';

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
			$( '.output' ).html( 'wefrwefwf' );


			function repoKey() {
				return 'temp repoKey';
			}

			/**
			 * Parse jsonp and calcuate various arbitrary musical properties, and assign them to the repoMusic object.
			 *
			 * @todo
			 */

			var repoMusic = {
				duration: repo.length,
				key: repoKey(),
			}


			/**
			 * Now we create music from the repoMusic values, using Tone.js
			 *
			 * @todo
			 */

		}
	} )

} );
