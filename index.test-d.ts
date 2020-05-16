import * as minimist from 'minimist';
import buildOptions from '.';

buildOptions({name: 'string'});
buildOptions({force: 'boolean'});
buildOptions({score: 'number'});
buildOptions({array: 'array'});
buildOptions({array: 'string-array'});
buildOptions({array: 'boolean-array'});
buildOptions({array: 'number-array'});
buildOptions({
	name: {
		type: 'string',
		alias: 'n',
		default: 'john'
	}
});
buildOptions({
	force: {
		type: 'boolean',
		alias: ['f', 'o'],
		default: false
	}
});
buildOptions({
	score: {
		type: 'number',
		alias: 's',
		default: 0
	}
});
buildOptions({
	arr: {
		type: 'array',
		alias: 'a',
		default: []
	}
});
buildOptions({
	strings: {
		type: 'string-array',
		alias: 's',
		default: ['a', 'b']
	}
});
buildOptions({
	booleans: {
		type: 'boolean-array',
		alias: 'b',
		default: [true, false]
	}
});
buildOptions({
	numbers: {
		type: 'number-array',
		alias: 'n',
		default: [0, 1]
	}
});

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

	array: {
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

	arguments: 'string',

	stopEarly: true,

	unknown: (arg: string) => arg.startsWith('-')
});

minimist(['--option', 'value', 'input'], options);
