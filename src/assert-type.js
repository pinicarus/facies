"use strict";

const isPlainObject   = require("is-plain-obj");
const {mapObjIndexed} = require("ramda");

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
 * Verifies the type of a primitive value.
 * @private
 *
 * @param {*} expected - The value expected type(s).
 * @param {*} value    - The value to verify the type of.
 *
 * @returns {*}         The value.
 * @throws  {TypeError} Whenever the value is wrongly typed.
 */
const assertPrimitive = function assertPrimitive(expected, value) {
	const actual = value === null ? null : types[typeof value];

	if (Array.isArray(expected)) {
		if (expected.some((type) => actual === type || value instanceof type)) {
			return value;
		}
	}
	else if (actual === expected || value instanceof expected) {
		return value;
	}
	throw new TypeError("wrong type");
};

/**
 * Verifies the type of a value.
 * @private
 *
 * @param {*} expected - The value expected type(s).
 * @param {*} value    - The value to verify the type of.
 *
 * @returns {*}         The value.
 * @throws  {TypeError} Whenever the value is wrongly typed.
 */
const assertType = function assertType (expected, value) {
	if (!isPlainObject(expected)) {
		return assertPrimitive(expected, value);
	}
	return mapObjIndexed((type, key) => assertType(type, value[key]), expected);
};

module.exports = {assertType};
