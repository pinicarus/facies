"use strict";

const TypeDefinition = require("./type-definition");
const assertType     = require("./assert-type");

/**
 * Filters optional and required parameters.
 * Missing optional parameters will be replaced by `undefined'.
 * @private
 *
 * @param {Array}     values      - The values to filter.
 * @param {Typedef[]} definitions - The type definitions to filter with.
 * @param {Boolean}   [strict]    - Whether all values have to be filtered.
 *
 * @returns {Array}     The filtered values.
 * @throws  {TypeError} Whenever a required parameter is missing.
 * @throws  {TypeError} Whenever a required parameter has the wrong type.
 * @throws  {TypeError} Whenever there are pending values with strict filter.
 */
const match = function match(values, definitions, strict) {
  const pending    = Array.from(values);
  const parameters = definitions.map((definition) => {
    const values = assertType(TypeDefinition, definition).match(pending);

    pending.splice(0, values.length);
    return values.length > 1 ? values : values[0];
  });

  if (strict && pending.length > 0) {
    throw new TypeError(`${pending.length} extra parameters`);
  }

  return parameters.concat(pending);
};

module.exports = match;
