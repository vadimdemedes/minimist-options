# minimist-options [![Build Status](https://travis-ci.org/vdemedes/minimist-options.svg?branch=master)](https://travis-ci.org/vdemedes/minimist-options)

> Write options for [minimist](https://npmjs.org/package/minimist) in a comfortable way.

## Installation

```
$ npm install minimist-options --save
```

## Usage

```js
const buildOptions = require('minimist-options');
const minimist = require('minimist');

const options = {
	name: {
		type: 'string',
		aliases: 'n',
		default: 'john'
	},

	force: {
		type: 'boolean',
		aliases: ['f', 'o'],
		default: false
	},

	published: 'boolean'
};

const args = minimist(options);
```

instead of:

```js
const minimist = require('minimist');

const options = {
	string: ['name'],
	boolean: ['force', 'published'],
	alias: {
		n: 'name',
		f: 'force',
		o: 'force'
	},
	default: {
		name: 'john',
		f: false
	}
};

const args = minimist(options);
```

## License

MIT © [Vadym Demedes](http://vadimdemedes.com)
