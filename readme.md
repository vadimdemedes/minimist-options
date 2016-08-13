# minimist-options [![Build Status](https://travis-ci.org/vdemedes/minimist-options.svg?branch=master)](https://travis-ci.org/vdemedes/minimist-options)

Write options for [minimist](https://npmjs.org/package/minimist) in a comfortable way.

## Installation

```
$ npm install minimist-options --save
```


## Usage

```js
const buildOptions = require('minimist-options');
const minimist = require('minimist');

let options = {
	name: {
		type: 'string',
		alias: 'n',
		default: 'john'
	},

	force: {
		type: 'boolean',
		alias: 'f',
		default: false
	},

	published: 'boolean'
};

let args = minimist(options);
```

instead of:

```js
const minimist = require('minimist');

let options = {
	string: ['name'],
	boolean: ['force', 'published'],
	alias: {
		n: 'name',
		f: 'force'
	},
	default: {
		name: 'john',
		f: false
	}
};

let args = minimist(options);
```

## Tests

[![Build Status](https://travis-ci.org/vdemedes/minimist-options.svg?branch=master)](https://travis-ci.org/vdemedes/minimist-options)

```
$ npm test
```

## License

MIT © [Vadym Demedes](http://vadimdemedes.com)
