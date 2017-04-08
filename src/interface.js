"use strict";

const R             = require("ramda");
const isPlainObject = require("is-plain-obj");

/**
 * A wildcard to match any value.
 * @type Symbol
 */
const any = Symbol("*");

/**
 * A mapping of type names to types.
 * @private
 * @enum {*}
 */
const types = {
	"undefined": undefined,
	"boolean":   Boolean,
	"function":  Function,
	"number":    Number,
	"string":    String,
	"symbol":    Symbol,
};

/**
 * Reduces the values of an object.
 * @private
 *
 * @param {Function} callback - The function to call for each object value.
 * @param {*}        initial  - The accumulator initial value.
 * @param {Object}   object   - The object to reduce.
 *
 * @returns {*} The accumulator final value.
 */
const reduceObject = function reduceObject(callback, initial, object) {
	let accumulator = initial;

	R.forEachObjIndexed((value, key, iterable) => {
		accumulator = callback(accumulator, value, key, iterable);
	}, object);
	return accumulator;
};

/**
 * Verifies the type of a primitive value.
 * @private
 *
 * @param {*} expected - The value expected type.
 * @param {*} value    - The value to verify the type of.
 *
 * @returns {Boolean} Whether the value matches the type.
 */
const verifyPrimitive = function verifyPrimitive(expected, value) {
	const actual = value === null ? null : types[typeof value];

	return actual === expected || value instanceof expected;
};

/**
 * Verifies the type of a value.
 * @private
 *
 * @param {*} expected - The value expected type.
 * @param {*} value    - The value to verify the type of.
 *
 * @returns {Boolean} Whether the value matches the type.
 */
const verifyType = function verifyType(expected, value) {
	switch (true) {
		case expected === any:
			return true;
		case R.isNil(expected):
			return expected === value;
		case Array.isArray(expected):
			return Array.isArray(value) && expected.every((type, index) => verifyType(type, value[index]));
		case isPlainObject(expected):
			return !R.isNil(value) && reduceObject((ok, type, key) => ok && verifyType(type, value[key]), true, expected);
		default:
			return verifyPrimitive(expected, value);
	}
};

/**
 * Returns a type to check value against with the `instanceof` operator.
 *
 * @param {...*} expected - The value expected types.
 *
 * @returns {Object} A type to verify value against with the `instanceof` operator.
 */
const Interface = function Interface(...expected) {
	/**
	 * A class to allow nesting of interfaces definitions while not mismatching them w/ plain objects.
	 * @private
	 */
	return class {
		/**
		 * A method to override the default behaviour of the `instanceof` operator.
		 * @private
		 *
		 * @param {*} value - The value to check against the expected types.
		 *
		 * @returns {Boolean} Whether the value matches any of the expected types.
		 */
		static [Symbol.hasInstance](value) {
			return expected.some((type) => verifyType(type, value));
		}
	};
};

module.exports = {
	Interface,
	any,
};
