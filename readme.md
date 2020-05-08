# minimist-options [![Build Status](https://travis-ci.org/vadimdemedes/minimist-options.svg?branch=master)](https://travis-ci.org/vadimdemedes/minimist-options)

> Write options for [minimist](https://npmjs.org/package/minimist)* in a comfortable way.
> Support string, boolean, number and array options.

\* and compatible successors such as [yargs](https://npmjs.org/package/yargs).

## Installation

```
$ npm install --save minimist-options
```

## Usage

```js
const buildOptions = require('minimist-options');
const minimist = require('minimist');

const options = buildOptions({
	name: {
		type: 'string',
		alias: 'n',
		default: 'john'
	},

	force: {
		type: 'boolean',
		alias: ['f', 'o'],
		default: false
	},

	score: {
		type: 'number',
		alias: 's',
		default: 0
	},

	arr: {
		type: 'array',
		alias: 'a',
		default: []
	},

	strings: {
		type: 'string-array',
		alias: 's',
		default: ['a', 'b']
	},

	booleans: {
		type: 'boolean-array',
		alias: 'b',
		default: [true, false]
	},

	numbers: {
		type: 'number-array',
		alias: 'n',
		default: [0, 1]
	},

	published: 'boolean',

	// Special option for positional arguments (`_` in minimist)
	arguments: 'string'
});

const args = minimist(process.argv.slice(2), options);
```

instead of:

```js
const minimist = require('minimist');

const options = {
	string: ['name', '_'],
	number: ['score'],
	array: [
		'arr',
		{key: 'strings', string: true},
		{key: 'booleans', boolean: true},
		{key: 'numbers', number: true}
	],
	boolean: ['force', 'published'],
	alias: {
		n: 'name',
		f: 'force',
		s: 'score',
		a: 'arr'
	},
	default: {
		name: 'john',
		f: false,
		score: 0,
		arr: []
	}
};

const args = minimist(process.argv.slice(2), options);
```

## Note about array options

The `array` types are only supported by [yargs](https://npmjs.org/package/yargs).

[minimist](https://npmjs.org/package/minimist) does _not_ explicitly support array type options. If you set an option multiple times, it will indeed yield an array of values. However, if you only set it once, it will simply give the value as is, without wrapping it in an array. Thus, effectively ignoring `type: 'array'`.

## License

MIT © [Vadim Demedes](https://vadimdemedes.com)
