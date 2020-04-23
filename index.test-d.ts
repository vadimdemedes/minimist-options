import * as minimist from 'minimist';
import buildOptions from '.';

buildOptions({name: 'string'});
buildOptions({force: 'boolean'});
buildOptions({score: 'number'});
buildOptions({array: 'array'});
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
		type: ['string'],
		alias: 's',
		default: ['a']
	}
});
buildOptions({
	numbers: {
		type: ['number'],
		alias: 'n',
		default: [0]
	}
});
buildOptions({
	booleans: {
		type: ['boolean'],
		alias: 'b',
		default: [false]
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
		type: ['string'],
		alias: 's',
		default: ['a']
	},

	numbers: {
		type: ['number'],
		alias: 'n',
		default: [0]
	},

	booleans: {
		type: ['boolean'],
		alias: 'b',
		default: [false]
	},

	published: 'boolean',

	arguments: 'string',

	stopEarly: true,

	unknown: (arg: string) => arg.startsWith('-')
});

minimist(['--option', 'value', 'input'], options);
