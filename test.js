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
	amount: 'number'
}, {});

test('alias', validate, {
	amount: {
		alias: 'a'
	}
}, {
	alias: {
		a: 'amount'
	}
});

test('alias array', validate, {
	amount: {
		alias: ['a', 'amnt']
	}
}, {
	alias: {
		a: 'amount',
		amnt: 'amount'
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
	amount: {
		type: 'number',
		alias: 'a'
	}
}, {
	alias: {
		a: 'amount'
	}
});

test('default value', validate, {
	amount: {
		default: 10
	}
}, {
	default: {
		amount: 10
	}
});

test('arguments type', validate, {
	arguments: 'string'
}, {
	string: ['_']
});
