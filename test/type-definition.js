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

	it("should match default value", function () {
		const typedef = new TypeDefinition(Object, {a: 1});

		assert.deepEqual(typedef.match([]), [0, [{a: 1}]]);
		assert.deepEqual(typedef.match(["a"]), [0, [{a: 1}]]);
	});

	it("should reject wrongly typed value", function () {
		assert.throws(() => new TypeDefinition(Object).match([1]), TypeError);
		assert.throws(() => new TypeDefinition([Number, String]).match([{}]), TypeError);
	});

	it("should reject missing value", function () {
		assert.throws(() => new TypeDefinition(Object).match([]), TypeError);
	});
});
