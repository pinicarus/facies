"use strict";

const assert = require("assert");

const {TypeDefinition} = requireSrc("type-definition");

describe("TypeDefinition", function () {
	it("should conform", function () {
		assert.doesNotThrow(() => new TypeDefinition(Object, {}));
		assert.throws(() => new TypeDefinition(Object, 1), TypeError);

		assert.doesNotThrow(() => new TypeDefinition(Object, {}, 1));
		assert.throws(() => new TypeDefinition(Object, {}, "a"), TypeError);

		assert.throws(() => new TypeDefinition(Object, {}, -1), TypeError);
		assert.throws(() => new TypeDefinition(Object, {}).match(1), TypeError);
	});

	it("should match no value", function () {
		const typedef = new TypeDefinition(Object, {}, 0);

		assert.deepEqual(typedef.match([1, "a", true]), [0, []]);
	});

	it("should match single value", function () {
		const typedef = new TypeDefinition(Object, [], 1);

		assert.deepEqual(typedef.match(["a"]), [0, [[]]]);
		assert.deepEqual(typedef.match([{}]),  [1, [{}]]);
	});

	it("should match multiple values", function () {
		const typedef = new TypeDefinition(Object, {}, 2);

		assert.deepEqual(typedef.match([{a: 1}, 1, {b: 2}]), [1, [{a: 1}, {}]]);
	});

	it("should match multiple types", function () {
		const typedef = new TypeDefinition([Number, String], null, 2);

		assert.deepEqual(typedef.match(["a", 1]), [2, ["a", 1]]);
	});

	it("should match object templates", function () {
		const typedef = new TypeDefinition({
			a: Number,
			b: [Boolean, String],
			c: {
				d: RegExp,
				e: [Date, Function],
			},
		}, {
			a: 1,
			b: false,
			c: {
				d: /^$/,
				e: new Date(0),
			},
		}, 2);

		assert.deepEqual(typedef.match([{
			a: 2,
			b: "x",
			c: {
				d: /^x$/,
				e: new Date(1),
			},
		}]), [1, [{
			a: 2,
			b: "x",
			c: {
				d: /^x$/,
				e: new Date(1),
			},
		}, {
			a: 1,
			b: false,
			c: {
				d: /^$/,
				e: new Date(0),
			},
		}]]);
	});

	it("should match default value", function () {
		const typedef = new TypeDefinition(Object, {a: 1});

		assert.deepEqual(typedef.match([]), [0, [{a: 1}]]);
		assert.deepEqual(typedef.match(["a"]), [0, [{a: 1}]]);
	});

	it("should reject wrongly typed value", function () {
		assert.throws(() => new TypeDefinition(Object).match([1]), TypeError);
		assert.throws(() => new TypeDefinition([Number, String]).match([{}]), TypeError);
		assert.throws(() => new TypeDefinition({a: Number}).match([true]), TypeError);
		assert.throws(() => new TypeDefinition({a: Number}).match([{b: 1}]), TypeError);
	});

	it("should reject missing value", function () {
		assert.throws(() => new TypeDefinition(Object).match([]), TypeError);
		assert.throws(() => new TypeDefinition({a: Number}).match([{}]), TypeError);
	});
});
