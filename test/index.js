"use strict";

const assert = require("assert");

const facies = requireSrc("index");

describe("API", function () {
	it("should conform", function () {
		assert(facies           instanceof Object);
		assert(facies.Interface instanceof Function);
		assert(facies.match     instanceof Function);
		assert.equal(typeof facies.any, "symbol");
	});

	it("should be immutable", function () {
		assert.throws(() => { facies.x = true; }, TypeError);
	});

	it("should be currified", function () {
		assert.equal(facies.match.length, 2);
		assert(facies.match([]) instanceof Function);
		assert.deepEqual(facies.match([])([]), facies.match([], []));
	});
});
