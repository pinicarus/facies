"use strict";

const {assertType} = require("./assert-type");

/**
 * Storage for the internal properties of TypeDefinition instances.
 * @private
 * @type {WeakMap}
 */
const properties = new WeakMap();

/**
 * A parameter type filtering definition.
 */
const TypeDefinition = class TypeDefinition {
	/**
	 * Constructs a new type definition.
	 *
	 * @param {*}      type         - The type to match parameters against.
	 * @param {*}      [value=null] - The default value for optional parameters.
	 * @param {Number} [count=1]    - The number of values to match.
	 *
	 * @throws {TypeError} Whenever count is not a positive number.
	 * @throws {TypeError} Whenever value is given and wrongly typed.
	 */
	constructor(type, value = null, count = 1) {
		const required = arguments.length < 2;

		assertType(Number, count);
		if (count < 0) {
			throw new TypeError("negative count");
		}
		properties.set(this, {
			required,
			type,
			count,
			defaultValue: value !== null ? assertType(type, value) : value,
		});
	}

	/**
	 * Matches a list of values against the definition.
	 * @private
	 *
	 * @param {Array<*>} values - The list of values to match agains the definition.
	 *
	 * @returns {Array<*>}  The matched or default values.
	 * @throws  {TypeError} Whenever matching cannot fulfill the definition.
	 */
	match(values) {
		const {count, required, type, defaultValue} = properties.get(this);

		assertType(Array, values);
		return Array.from(new Array(count)).reduce((matched, _, index) => {
			if (values.length <= index) {
				if (required) {
					throw new TypeError("missing value");
				}
				matched[1].push(defaultValue);
				return matched;
			}

			try {
				const value = assertType(type, values[index]);

				++matched[0];
				matched[1].push(value);
				return matched;
			} catch(error) {
				if (error instanceof TypeError && !required) {
					matched[1].push(defaultValue);
					return matched;
				}
				throw error;
			}
		}, [0, []]);
	}
};

module.exports = {TypeDefinition};
