"use strict";

const {Interface} = require("./interface");

/**
 * Ensures the given values match the expected interfaces.
 *
 * @param {Array<(*|Array<*>)>} expected - An array-like of interfaces w/ optional default, to match the values against.
 * @param {Array<*>}            values   - An array-like of values to match.
 *
 * @returns {Array<*>}  The matched values or their default values.
 * @throws  {TypeError} Whenever not enough values are given and no default values are available to complete.
 * @throws  {TypeError} Whenever a value does not match any of its interfaces and no default value is available.
 */
const match = function match(expected, values) {
	const _values = Array.from(values);

	return Array.from(expected).map((type, index) => {
		const types        = Array.isArray(type) ? type : [type];
		const hasDefault   = types.length > 1;
		const defaultValue = hasDefault ? types.pop() : undefined;

		if (_values.length > 0) {
			const value = _values[0];

			if (types.some((candidate) => value instanceof Interface(candidate))) {
				return _values.shift();
			}
			if (hasDefault) {
				return defaultValue;
			}
			throw new TypeError(`wrong type for argument #${index + 1}`);
		}

		if (!hasDefault) {
			throw new TypeError(`missing argument #${index + 1}`);
		}
		return defaultValue;
	});
};

module.exports = {match};
