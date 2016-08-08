"use strict";

const types = {
  "undefined": undefined,
  "boolean":   Boolean,
  "function":  Function,
  "number":    Number,
  "string":    String,
  "symbol":    Symbol,
};

/**
 * Verifies the type of a value.
 * @private
 *
 * @param {*} expected - The value expected type.
 * @param {*} value    - The value to verify the type of.
 *
 * @returns {*}         The value.
 * @throws  {TypeError} Whenever the value is wrongly typed.
 */
const assertType = function assertType (expected, value) {
  const actual = value === null ? null : types[typeof value];
  
  if (actual === expected || value instanceof expected) {
    return value;
  }
  throw new TypeError("wrong type");
};

module.exports = assertType;
