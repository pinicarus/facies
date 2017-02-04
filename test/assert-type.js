"use strict";

const assert = require("assert");

const {assertType} = requireSrc("assert-type");

describe("assertType", function () {
	it("should match primitive types", function () {
		assert.doesNotThrow(() => assertType(undefined, undefined));
		assert.doesNotThrow(() => assertType(null,      null));
		assert.doesNotThrow(() => assertType(Boolean,   false));
		assert.doesNotThrow(() => assertType(Boolean,   true));
		assert.doesNotThrow(() => assertType(Number,    0));
		assert.doesNotThrow(() => assertType(Number,    1));
		assert.doesNotThrow(() => assertType(String,    ""));
		assert.doesNotThrow(() => assertType(String,    "a"));
		assert.doesNotThrow(() => assertType(Symbol,    Symbol()));
		assert.doesNotThrow(() => assertType(Symbol,    Symbol("a")));
	});

	it("should match object types", function () {
		const F = function () {};
		const C = class extends F {};

		assert.doesNotThrow(() => assertType(Object,   {}));
		assert.doesNotThrow(() => assertType(Array,    []));
		assert.doesNotThrow(() => assertType(Object,   []));
		assert.doesNotThrow(() => assertType(Function, function () {}));
		assert.doesNotThrow(() => assertType(Function, () => {}));
		assert.doesNotThrow(() => assertType(Function, class {}));
		assert.doesNotThrow(() => assertType(Function, F));
		assert.doesNotThrow(() => assertType(Function, C));
		assert.doesNotThrow(() => assertType(F,        new F()));
		assert.doesNotThrow(() => assertType(F,        new C()));
		assert.doesNotThrow(() => assertType(C,        new C()));
		assert.doesNotThrow(() => assertType(RegExp,   /^$/));
		assert.doesNotThrow(() => assertType(RegExp,   /^a$/));
		assert.doesNotThrow(() => assertType(Object,   /^a$/));
		assert.doesNotThrow(() => assertType(Date,     new Date()));
		assert.doesNotThrow(() => assertType(Object,   new Date()));
	});

	it("should match multiple types", function () {
		assert.doesNotThrow(() => assertType([Number, String, RegExp], 1));
		assert.doesNotThrow(() => assertType([Number, String, RegExp], "a"));
		assert.doesNotThrow(() => assertType([Number, String, RegExp], /^a$/));
	});

	it("should match object templates", function () {
		const template = {
			a: Number,
			b: [Boolean, String],
			c: {
				d: RegExp,
				e: [Date, Function],
			},
		};

		assert.doesNotThrow(() => assertType(template, {
			a: 1,
			b: true,
			c: {
				d: /^a$/,
				e: new Date(),
			},
		}));
		assert.doesNotThrow(() => assertType(template, {
			a: 1,
			b: "x",
			c: {
				d: /^a$/,
				e: () => {},
			},
		}));
	});

	it("should reject wrongly typed values", function () {
		assert.throws(() => assertType(undefined, null), TypeError);
		assert.throws(() => assertType(Object,    1), TypeError);
		assert.throws(() => assertType(Array,     {}), TypeError);
		assert.throws(() => assertType([Number, String], true), TypeError);
		assert.throws(() => assertType({a: Number}, true), TypeError);
		assert.throws(() => assertType({a: Number}, {}), TypeError);
		assert.throws(() => assertType({a: Number}, {b: 1}), TypeError);
	});
});
