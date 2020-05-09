'use strict';

const isPlainObject = require('is-plain-obj');
const arrify = require('arrify');
const kindOf = require('kind-of');

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

const prettyPrint = output =>
	Array.isArray(output) ?
		`[${output.map(prettyPrint).join(', ')}]` :
		kindOf(output) === 'string' ? JSON.stringify(output) : output;

const passthroughOptions = ['stopEarly', 'unknown', '--'];
const availableTypes = ['string', 'boolean', 'number', 'array', 'string-array', 'boolean-array', 'number-array'];

const buildOptions = options => {
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
			const {type} = props;
			const isTypedArrayType = type && type.endsWith('-array');

			if (type) {
				if (!availableTypes.includes(type)) {
					throw new TypeError(`Expected type of "${key}" to be one of ${prettyPrint(availableTypes)}, got ${prettyPrint(type)}`);
				}

				if (isTypedArrayType) {
					const [elementType] = type.split('-');
					push(result, 'array', {key, [elementType]: true});
				} else {
					push(result, type, key);
				}
			}

			if ({}.hasOwnProperty.call(props, 'default')) {
				const {default: defaultValue} = props;
				const defaultType = isTypedArrayType && Array.isArray(defaultValue) && defaultValue.length > 0 ?
					`${kindOf(defaultValue[0])}-array` :
					kindOf(defaultValue);

				if (type && type !== defaultType) {
					throw new TypeError(`Expected "${key}" default value to be of type "${type}", got ${prettyPrint(defaultType)}`);
				}

				insert(result, 'default', key, defaultValue);
			}

			arrify(props.alias).forEach(alias => {
				insert(result, 'alias', alias, key);
			});
		}
	});

	return result;
};

module.exports = buildOptions;
module.exports.default = buildOptions;
