"use strict";

const assertType = require("./assert-type");

const _required = Symbol("required");
const _type     = Symbol("type");
const _count    = Symbol("count");
const _default  = Symbol("default");

/**
 * Parameter type filtering definition.
 */
const TypeDefinition = class TypeDefinition {
  /**
   * Constructs a new type definition.
   *
   * @param {*}      type      - The type to match parameters against.
   * @param {*}      [value]   - The default value for optional parameters.
   * @param {Number} [count=1] - The number of values to match.
   *
   * @throws {TypeError} Whenever count is not a positive number.
   * @throws {TypeError} Whenever value is given and wrongly typed.
   */
  constructor(type, value, count) {
    this[_required] = arguments.length < 2;
    this[_type]     = type;
    this[_default]  = !this[_required] && value !== null
                    ? assertType(type, value)
                    : value;
    this[_count]    = count !== undefined ? assertType(Number, count) : 1;
    if (this[_count] < 0) {
      throw new TypeError("negative count");
    }
  }

  /**
   * Matches a list of values against the definition.
   *
   * @param {Array} values - The list of values to match agains the definition.
   *
   * @returns {Array}     The matched or default values.
   * @throws  {TypeError} Whenever matching cannot fulfill the definition.
   */
  match(values) {
    assertType(Array, values);
    return Array.from(new Array(this[_count])).reduce((matched, _, index) => {
      if (values.length <= index) {
        if (this[_required]) {
          throw new TypeError("missing value");
        }
        matched[1].push(this[_default]);
        return matched;
      }

      try {
        const value = assertType(this[_type], values[index]);

        ++matched[0];
        matched[1].push(value);
        return matched;
      } catch(error) {
        if (error instanceof TypeError && !this[_required]) {
          matched[1].push(this[_default]);
          return matched;
        }
        throw error;
      }
    }, [0, []]);
  }
};

module.exports = TypeDefinition;
