import isPlainObject from 'is-plain-obj';
import arrify from 'arrify';
import kindOf from 'kind-of';

const push = (object, prop, value) => {
	if (!object[prop]) {
		object[prop] = [];
	}

	object[prop].push(value);
};

const insert = (object, prop, key, value) => {
	if (!object[prop]) {
		object[prop] = {};
	}

	object[prop][key] = value;
};

const prettyPrint = output => Array.isArray(output)
	? `[${output.map(prettyPrint).join(', ')}]`
	: (kindOf(output) === 'string' ? JSON.stringify(output) : output);

const resolveType = value => {
	if (Array.isArray(value) && value.length > 0) {
		const [element] = value;
		return `${kindOf(element)}-array`;
	}

	return kindOf(value);
};

const normalizeExpectedType = (type, defaultValue) => {
	const inferredType = type === 'array' ? 'string-array' : type;

	if (arrayTypes.includes(inferredType) && Array.isArray(defaultValue) && defaultValue.length === 0) {
		return 'array';
	}

	return inferredType;
};

const passthroughOptions = ['stopEarly', 'unknown', '--'];
const primitiveTypes = ['string', 'boolean', 'number'];
const arrayTypes = primitiveTypes.map(t => `${t}-array`);
const availableTypes = [...primitiveTypes, 'array', ...arrayTypes];

const buildOptions = options => {
	options = options || {};

	const result = {};

	for (const key of passthroughOptions) {
		if (options[key]) {
			result[key] = options[key];
		}
	}

	for (let key of Object.keys(options)) {
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

			if (type) {
				if (!availableTypes.includes(type)) {
					throw new TypeError(`Expected type of "${key}" to be one of ${prettyPrint(availableTypes)}, got ${prettyPrint(type)}`);
				}

				if (arrayTypes.includes(type)) {
					const [elementType] = type.split('-');
					push(result, 'array', {key, [elementType]: true});
				} else {
					push(result, type, key);
				}
			}

			if (Object.prototype.hasOwnProperty.call(props, 'default')) {
				const {default: defaultValue} = props;
				const defaultType = resolveType(defaultValue);
				const expectedType = normalizeExpectedType(type, defaultValue);

				if (expectedType && expectedType !== defaultType) {
					throw new TypeError(`Expected "${key}" default value to be of type "${expectedType}", got ${prettyPrint(defaultType)}`);
				}

				insert(result, 'default', key, defaultValue);
			}

			for (const alias of arrify(props.alias)) {
				insert(result, 'alias', alias, key);
			}
		}
	}

	return result;
};

export default buildOptions;
