# Console prompt

Prompts the user for information at the console in a nodejs programme.

Returns a [Promise](http://www.html5rocks.com/en/tutorials/es6/promises/).

```javascript
var prompt = require('console-prompt');
prompt( 'password\n> ', 'hidden' )
	.then( function(value) {
		console.log( "You've entered password", value );
	} );
```

`prompt` takes two parameters:

* `message` - _String_ - text to display on the screen
* `hidden` - _Truthy_ - if truthy the user's input is replaced with stars.

## Installation

```base
$ npm install console-prompt
```

## Issues

### Pasting

The code reacts badly to `\n`, and possibly many other characters, being pasted in.
Avoid.

### Windows

In Windows, backspacing in a hidden field won't update on screen correctly unless
you are using a terminal supporting
[ANSI escape sequences](http://en.wikipedia.org/wiki/ANSI_escape_code).

It should still collect the correct information, though.