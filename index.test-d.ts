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

	published: 'boolean',

	arguments: 'string'
});

minimist(['--option', 'value', 'input'], options);
