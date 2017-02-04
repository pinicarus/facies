"use strict";

const assert = require("assert");

const facies = require("..");

const target = function () {
	const parameters = facies.match(arguments, [
		new facies.TypeDefinition(Number),
		new facies.TypeDefinition(String, "a"),
	]);

	return parameters;
};

assert.deepEqual(target(1), [1, "a"]);
assert.deepEqual(target(1, "b"), [1, "b"]);

assert.throws(() => target("b"), TypeError);
