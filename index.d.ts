import {Opts as MinimistOptions} from 'minimist';

type PrimitiveOptionType = 'string' | 'boolean' | 'number';
export type OptionType = PrimitiveOptionType | 'array' | ReadonlyArray<PrimitiveOptionType>;

export interface BaseOption<
	TypeOptionType extends OptionType,
	DefaultOptionType
> {
	/**
	 * The data type the option should be parsed to.
	 */
	readonly type?: TypeOptionType;

	/**
	 * An alias/list of aliases for the option.
	 */
	readonly alias?: string | ReadonlyArray<string>;

	/**
	 * The default value for the option.
	 */
	readonly default?: DefaultOptionType;
}

export type StringOption = BaseOption<'string', string>;
export type BooleanOption = BaseOption<'boolean', boolean>;
export type NumberOption = BaseOption<'number', number>;
export type DefaultArrayOption = BaseOption<'array', ReadonlyArray<string>>;
export type StringArrayOption = BaseOption<ReadonlyArray<'string'>, ReadonlyArray<string>>;
export type NumberArrayOption = BaseOption<ReadonlyArray<'number'>, ReadonlyArray<number>>;
export type BooleanArrayOption = BaseOption<ReadonlyArray<'boolean'>, ReadonlyArray<boolean>>;

type MinimistOption = NonNullable<
	| MinimistOptions['stopEarly']
	| MinimistOptions['unknown']
	| MinimistOptions['--']
>;

export type Options = {
	[key: string]:
		| OptionType
		| StringOption
		| BooleanOption
		| NumberOption
		| DefaultArrayOption
		| StringArrayOption
		| NumberArrayOption
		| BooleanArrayOption
		| MinimistOption;  // Workaround for https://github.com/microsoft/TypeScript/issues/17867
};

/**
 * Write options for [minimist](https://npmjs.org/package/minimist) in a comfortable way. Support string, boolean, number and array options.
 */
export default function buildOptions(options?: Options): MinimistOptions;
