'use strict';

const isPlainObject = require('is-plain-obj');
const arrify = require('arrify');

const push = (obj, prop, value) => {
	if (!obj[prop]) {
		obj[prop] = [];
	}

	obj[prop].push(value);
};

const insert = (obj, prop, key, value) => {
	if (!obj[prop]) {
		obj[prop] = {};
	}

	obj[prop][key] = value;
};

const passthroughOptions = ['stopEarly', 'unknown', '--'];

const availableTypes = ['string', 'boolean', 'number'];

module.exports = options => {
	options = options || {};

	const result = {};

	passthroughOptions.forEach(key => {
		if (options[key]) {
			result[key] = options[key];
		}
	});

	Object.keys(options).forEach(key => {
		let value = options[key];

		if (key === 'arguments') {
			key = '_';
		}

		// If short form is used
		// convert it to long form
		// e.g. { 'name': 'string' }
		if (typeof value === 'string') {
			value = {type: value};
		}

		if (isPlainObject(value)) {
			const props = value;

			if (props.type) {
				const type = props.type;

				if (availableTypes.indexOf(type) === -1) {
					throw new TypeError(`Expected "${key}" to be a boolean or a string, got ${type}`);
				}

				if (type === 'string') {
					push(result, 'string', key);
				}

				if (type === 'boolean') {
					push(result, 'boolean', key);
				}
			}

			const aliases = arrify(props.alias);

			aliases.forEach(alias => {
				insert(result, 'alias', alias, key);
			});

			if ({}.hasOwnProperty.call(props, 'default')) {
				if (props.type && props.type === 'boolean' && typeof props.default !== 'boolean') {
					throw new TypeError(`Expected "${key}" default value to be a boolean`);
				}
				if (props.type && props.type === 'string' && typeof props.default !== 'string') {
					throw new TypeError(`Expected "${key}" default value to be a string`);
				}

				insert(result, 'default', key, props.default);
			}
		}
	});

	return result;
};
