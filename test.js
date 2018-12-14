import test from 'ava';
import minimistOptions from '.';

const validate = (t, input, expected) => {
	t.deepEqual(minimistOptions(input), expected);
};

test('empty input', validate, {}, {});

test('string option', validate, {
	name: 'string'
}, {
	string: ['name']
});

test('boolean option', validate, {
	force: 'boolean'
}, {
	boolean: ['force']
});

test('number option', validate, {
	score: 'number'
}, {
	number: ['score']
});

test('object option', validate, {
	hash: 'object'
}, {
	object: ['hash']
});

test('alias', validate, {
	score: {
		alias: 's'
	}
}, {
	alias: {
		s: 'score'
	}
});

test('alias array', validate, {
	score: {
		alias: ['s', 'sc']
	}
}, {
	alias: {
		s: 'score',
		sc: 'score'
	}
});

test('alias and string', validate, {
	name: {
		type: 'string',
		alias: 'n'
	}
}, {
	string: ['name'],
	alias: {
		n: 'name'
	}
});

test('alias and boolean', validate, {
	force: {
		type: 'boolean',
		alias: 'f'
	}
}, {
	boolean: ['force'],
	alias: {
		f: 'force'
	}
});

test('alias and number', validate, {
	score: {
		type: 'number',
		alias: 's'
	}
}, {
	number: ['score'],
	alias: {
		s: 'score'
	}
});

test('alias and object', validate, {
	hash: {
		type: 'object',
		alias: 'h'
	}
}, {
	object: ['hash'],
	alias: {
		h: 'hash'
	}
});

test('default value', validate, {
	score: {
		default: 10
	}
}, {
	default: {
		score: 10
	}
});

test('default falsy value', validate, {
	falsePrimitive: {
		default: false
	},
	zero: {
		default: 0
	},
	empty: {
		default: ''
	},
	nan: {
		default: NaN
	},
	nullPrimitive: {
		default: null
	},
	undefinedPrimitive: {
		default: undefined
	}
}, {
	default: {
		falsePrimitive: false,
		zero: 0,
		empty: '',
		nan: NaN,
		nullPrimitive: null,
		undefinedPrimitive: undefined
	}
});

test('arguments type', validate, {
	arguments: 'string'
}, {
	string: ['_']
});

test('passthrough options', validate, {
	'--': true,
	stopEarly: true,
	unknown: true
}, {
	'--': true,
	stopEarly: true,
	unknown: true
});

test('fail if type is not boolean, string, number or object', t => {
	const error = t.throws(() => {
		minimistOptions({
			force: {
				type: 'bool',
				alias: 'f'
			}
		});
	}, TypeError);

	t.is(error.message, 'Expected "force" to be one of ["string", "boolean", "number", "object"], got bool');
});

test('fail if boolean default value is not a boolean', t => {
	const error = t.throws(() => {
		minimistOptions({
			force: {
				type: 'boolean',
				alias: 'f',
				default: 'true'
			}
		});
	}, TypeError);

	t.is(error.message, 'Expected "force" default value to be boolean, got string');
});

test('fail if boolean default value is not a number', t => {
	const error = t.throws(() => {
		minimistOptions({
			score: {
				type: 'number',
				alias: 's',
				default: '1'
			}
		});
	}, TypeError);

	t.is(error.message, 'Expected "score" default value to be number, got string');
});

test('fail if string default is not a string', t => {
	const error = t.throws(() => {
		minimistOptions({
			score: {
				type: 'string',
				alias: 's',
				default: {}
			}
		});
	}, TypeError);

	t.is(error.message, 'Expected "score" default value to be string, got object');
});

test('fail if object default is not an object', t => {
	const error = t.throws(() => {
		minimistOptions({
			score: {
				type: 'object',
				alias: 's',
				default: ''
			}
		});
	}, TypeError);

	t.is(error.message, 'Expected "score" default value to be object, got string');
});
