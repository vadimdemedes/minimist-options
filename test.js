import test from 'ava';
import minimistOptions from './index.js';

const validate = (t, input, expected) => {
	t.deepEqual(minimistOptions(input), expected);
};

test('empty input', validate, {}, {});

test('string option', validate, {
	name: 'string',
}, {
	string: ['name'],
});

test('boolean option', validate, {
	force: 'boolean',
}, {
	boolean: ['force'],
});

test('number option', validate, {
	score: 'number',
}, {
	number: ['score'],
});

test('default array option', validate, {
	arr: 'array',
}, {
	array: ['arr'],
});

test('string array option', validate, {
	arr: 'string-array',
}, {
	array: [{key: 'arr', string: true}],
});

test('number array option', validate, {
	arr: 'number-array',
}, {
	array: [{key: 'arr', number: true}],
});

test('boolean array option', validate, {
	arr: 'boolean-array',
}, {
	array: [{key: 'arr', boolean: true}],
});

test('multiple array options', validate, {
	xs: 'number-array',
	ys: 'boolean-array',
}, {
	array: [{key: 'xs', number: true}, {key: 'ys', boolean: true}],
});

test('string array default value is not string array fails', t => {
	t.throws(() => {
		minimistOptions({
			arr: {
				type: 'string-array',
				default: [2],
			},
		});
	}, {
		message: 'Expected "arr" default value to be of type "string-array", got "number-array"',
		instanceOf: TypeError,
	});
});

test('boolean array default value is not boolean array fails', t => {
	t.throws(() => {
		minimistOptions({
			arr: {
				type: 'boolean-array',
				default: ['score'],
			},
		});
	}, {
		message: 'Expected "arr" default value to be of type "boolean-array", got "string-array"',
		instanceOf: TypeError,
	});
});

test('number array default value is not number array fails', t => {
	t.throws(() => {
		minimistOptions({
			arr: {
				type: 'number-array',
				default: [true],
			},
		});
	}, {
		message: 'Expected "arr" default value to be of type "number-array", got "boolean-array"',
		instanceOf: TypeError,
	});
});

test('alias', validate, {
	score: {
		alias: 's',
	},
}, {
	alias: {
		s: 'score',
	},
});

test('alias array', validate, {
	score: {
		alias: ['s', 'sc'],
	},
}, {
	alias: {
		s: 'score',
		sc: 'score',
	},
});

test('alias and string', validate, {
	name: {
		type: 'string',
		alias: 'n',
	},
}, {
	string: ['name'],
	alias: {
		n: 'name',
	},
});

test('alias and boolean', validate, {
	force: {
		type: 'boolean',
		alias: 'f',
	},
}, {
	boolean: ['force'],
	alias: {
		f: 'force',
	},
});

test('alias and number', validate, {
	score: {
		type: 'number',
		alias: 's',
	},
}, {
	number: ['score'],
	alias: {
		s: 'score',
	},
});

test('alias and array', validate, {
	arr: {
		type: 'array',
		alias: 'a',
	},
}, {
	array: ['arr'],
	alias: {
		a: 'arr',
	},
});

test('default value', validate, {
	score: {
		default: 10,
	},
}, {
	default: {
		score: 10,
	},
});

test('default falsy value', validate, {
	falsePrimitive: {
		default: false,
	},
	zero: {
		default: 0,
	},
	empty: {
		default: '',
	},
	nan: {
		default: Number.NaN,
	},
	nullPrimitive: {
		default: null,
	},
	undefinedPrimitive: {
		default: undefined,
	},
}, {
	default: {
		falsePrimitive: false,
		zero: 0,
		empty: '',
		nan: Number.NaN,
		nullPrimitive: null,
		undefinedPrimitive: undefined,
	},
});

test('default array value', validate, {
	arr: {
		type: 'array',
		default: ['a'],
	},
}, {
	array: ['arr'],
	default: {
		arr: ['a'],
	},
});

test('default empty array value', validate, {
	arr: {
		type: 'array',
		default: [],
	},
	strings: {
		type: 'string-array',
		default: [],
	},
	booleans: {
		type: 'boolean-array',
		default: [],
	},
	numbers: {
		type: 'number-array',
		default: [],
	},
}, {
	array: [
		'arr',
		{key: 'strings', string: true},
		{key: 'booleans', boolean: true},
		{key: 'numbers', number: true},
	],
	default: {
		arr: [],
		strings: [],
		booleans: [],
		numbers: [],
	},
});

test('arguments type', validate, {
	arguments: 'string',
}, {
	string: ['_'],
});

test('passthrough options', validate, {
	'--': true,
	stopEarly: true,
	unknown: true,
}, {
	'--': true,
	stopEarly: true,
	unknown: true,
});

test('fail if type is not boolean, string, number or array', t => {
	t.throws(() => {
		minimistOptions({
			force: {
				type: 'bool',
			},
		});
	}, {
		message: 'Expected type of "force" to be one of ["string", "boolean", "number", "array", "string-array", "boolean-array", "number-array"], got "bool"',
		instanceOf: TypeError,
	});
});

test('fail if boolean default value is not a boolean', t => {
	t.throws(() => {
		minimistOptions({
			force: {
				type: 'boolean',
				default: 'true',
			},
		});
	}, {
		message: 'Expected "force" default value to be of type "boolean", got "string"',
		instanceOf: TypeError,
	});
});

test('fail if number default value is not a number', t => {
	t.throws(() => {
		minimistOptions({
			score: {
				type: 'number',
				default: '1',
			},
		});
	}, {
		message: 'Expected "score" default value to be of type "number", got "string"',
		instanceOf: TypeError,
	});
});

test('fail if string default value is not a string', t => {
	t.throws(() => {
		minimistOptions({
			score: {
				type: 'string',
				default: 1,
			},
		});
	}, {
		message: 'Expected "score" default value to be of type "string", got "number"',
		instanceOf: TypeError,
	});
});

test('fail if array default value is not an array', t => {
	t.throws(() => {
		minimistOptions({
			score: {
				type: 'array',
				default: '',
			},
		});
	}, {
		message: 'Expected "score" default value to be of type "string-array", got "string"',
		instanceOf: TypeError,
	});
});

test('fail if array default value element type is not string', t => {
	t.throws(() => {
		minimistOptions({
			score: {
				type: 'array',
				default: [1],
			},
		});
	}, {
		message: 'Expected "score" default value to be of type "string-array", got "number-array"',
		instanceOf: TypeError,
	});
});
