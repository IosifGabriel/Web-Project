/* jshint node: true, laxbreak: true */
"use strict";

/**
 *	Prompts the user for a value at the console
 */

var punycode = require('punycode');

if ( typeof Promise === 'undefined' ) {
	var Promise = require('promise-polyfill');
}

var isLowSurrogate = /[\uD834-\uDF06]/;
var isHighSurrogate = /[\uDC00-\uDFFF]/;
var rEndLineBreak = /\r?\n$/;

module.exports = function( prompt, hidden ) {

	var resolveProxy, rejectProxy;
	var promise = new Promise( function( resolve, reject ) {
		resolveProxy = resolve;
		rejectProxy = reject;
	} );

	process.stdout.write(prompt);
	process.stdin.setEncoding('utf8');

	if ( hidden ) {

		// See http://stackoverflow.com/questions/4708787/get-password-from-input-using-node-js
		process.stdin.setRawMode(true);
		process.stdin.resume();
		var value = '';
		process.stdin
			.on('data', function listener(chr) {

				switch (chr) {
					case "\n": 
					case "\r": 
					case "\u0004":
						// They've finished typing their password
						process.stdin.pause();
						process.stdin.setRawMode(false);
						
						process.stdin.removeListener( 'data', listener );
						process.stdin.removeListener( 'error', rejectProxy );
						
						process.stdout.write('\n');
						resolveProxy(value);	
					break;
					case "\u007f":
						// Backspace
						if ( value.length > 0 ) {
							process.stdout.write('\x1b[1D \x1b[1D');
						}
						// Check we need to delete a surrogate pair
						if ( value.length >= 2 
							&& isLowSurrogate.test(value.slice(-1)) 
							&& isHighSurrogate.test(value.slice(-2)) 
						) {
							value = value.slice(0,-2);
						} else {
							value = value.slice(0,-1);	
						}
					break;
					case "\u0003":
						// Ctrl C
						process.exit();
					break;
					default:
						value += chr;
						process.stdout.write( new Array( punycode.ucs2.decode(chr).length + 1 ).join('*'));
						
					break;
				}

			} )
			.on( 'error', rejectProxy );

	} else {

		process.stdin
			.on('data', function listener(chunk) {

				if ( chunk !== null ) {
					process.stdin.removeListener( 'data', listener );
					process.stdin.removeListener( 'error', rejectProxy );
					process.stdin.pause();
					// Remove trailing \n (or \r\n in Windows)
					chunk = chunk.replace( rEndLineBreak, '' );
					resolveProxy( chunk );
				}
				
			} )
			.on( 'error', rejectProxy )
			.resume();

	}

	return promise;

};