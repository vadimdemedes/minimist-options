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
	Array.isArray(output)
		? `[${output.map(prettyPrint).join(', ')}]`
		: kindOf(output) === 'string' ? JSON.stringify(output) : output;

const passthroughOptions = ['stopEarly', 'unknown', '--'];
const primitiveTypes = ['string', 'boolean', 'number'];
const arrayTypes = primitiveTypes.map(arrify);
const availableTypes = [...primitiveTypes, 'array', ...arrayTypes];

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
		if (typeof value === 'string' || Array.isArray(value)) {
			value = {type: value};
		}

		if (isPlainObject(value)) {
			const props = value;
			let {type} = props;

			if (type === 'array') {
				type = ['string'];
			}

			const isArrayType = Array.isArray(type);

			if (isArrayType) {
				const [elementType] = type;

				if (!primitiveTypes.includes(elementType)) {
					throw new TypeError(`Expected type of "${key}" to be one of ${prettyPrint(arrayTypes)}, got [${(prettyPrint(elementType))}]`);
				}

				push(result, "array", {key, [elementType]: true});
			}
			else if (type) {
				if (!availableTypes.includes(type)) {
					throw new TypeError(`Expected type of "${key}" to be one of ${prettyPrint(availableTypes)}, got ${prettyPrint(type)}`);
				}

				push(result, type, key);
			}

			if ({}.hasOwnProperty.call(props, 'default')) {
				const {default: defaultValue} = props;
				const isDefaultArrayType = Array.isArray(defaultValue);

				if (isArrayType && !(isDefaultArrayType && kindOf(defaultValue[0]) === type[0])) {
					const [expectedType] = type;
					const actualType = isDefaultArrayType ? `[${prettyPrint(kindOf(defaultValue[0]))}]` : prettyPrint(kindOf(defaultValue));
					throw new TypeError(`Expected "${key}" default value to be of type ["${expectedType}"], got ${actualType}`);
				}
				else if (type && kindOf(defaultValue) !== type) {
					throw new TypeError(`Expected "${key}" default value to be of type "${type}", got ${prettyPrint(kindOf(defaultValue))}`);
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
