"use strict";

const R             = require("ramda");
const isPlainObject = require("is-plain-obj");

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
 * @param {*} expected - The value expected type.
 * @param {*} value    - The value to verify the type of.
 *
 * @returns {Boolean} Whether the value matches the type..
 */
const verifyPrimitive = function verifyPrimitive(expected, value) {
	const actual = value === null ? null : types[typeof value];

	return actual === expected || value instanceof expected;
};

/**
 * Verifies the type of a value.
 * @private
 *
 * @param {*} expected - The value expected type(s).
 * @param {*} value    - The value to verify the type of.
 *
 * @returns {Boolean} Whether the value matches the type..
 */
const verifyType = function verifyType (expected, value) {
	switch (true) {
		case Array.isArray(expected):
			return expected.some((type) => verifyType(type, value));
		case isPlainObject(expected):
			return R.values(R.mapObjIndexed((type, key) => verifyType(type, value[key]), expected)).every(Boolean);
		default:
			return verifyPrimitive(expected, value);
	}
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
	if (!verifyType(expected, value)) {
		throw new TypeError("wrong type");
	}
	return value;
};

module.exports = {assertType};
