"use strict";

const assert = require("assert");

const index = requireSrc("index");

describe("API", function () {
	it("should conform", function () {
		assert(index instanceof Object);
		assert(index.match instanceof Function);
		assert(index.TypeDefinition instanceof Function);
	});

	it("should be immutable", function () {
		assert.throws(() => { index.x = true; }, TypeError);
		assert.throws(() => { index.match = true; }, TypeError);
		assert.throws(() => { index.TypeDefinition = true; }, TypeError);
	});
});
