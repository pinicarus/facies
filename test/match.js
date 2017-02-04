"use strict";

const assert = require("assert");

const {TypeDefinition} = requireSrc("type-definition");
const {match}          = requireSrc("match");

describe("match", function () {
	it("should match strict definitions", function () {
		assert.deepEqual(match([1], [
			new TypeDefinition(Number),
		], true), [1]);

		assert.deepEqual(match([1, "a"], [
			new TypeDefinition(Number),
			new TypeDefinition(String),
		], true), [1, "a"]);

		assert.deepEqual(match([1, "a", {b: true}], [
			new TypeDefinition(Number),
			new TypeDefinition(String),
			new TypeDefinition(Object),
		], true), [1, "a", {b: true}]);

		assert.deepEqual(match([1, "a"], [
			new TypeDefinition([Number, String]),
			new TypeDefinition([Number, String]),
		], true), [1, "a"]);

		assert.deepEqual(match([1, 2, 3], [
			new TypeDefinition(Number, 0, 3),
		], true), [[1, 2, 3]]);

		assert.deepEqual(match([{
			a: 1,
			b: false,
			c: {
				d: /^$/,
				e: new Date(0),
			},
		}], [
			new TypeDefinition({
				a: Number,
				b: [Boolean, String],
				c: {
					d: RegExp,
					e: [Date, Function],
				},
			}),
		], true), [{
			a: 1,
			b: false,
			c: {
				d: /^$/,
				e: new Date(0),
			},
		}]);
	});

	it("should match relaxed definitions", function () {
		assert.deepEqual(match([1, "a", {b: true}, /^x$/], [
			new TypeDefinition(Number),
		], false), [1, "a", {b: true}, /^x$/]);

		assert.deepEqual(match([1, "a", {b: true}, /^x$/], [
			new TypeDefinition(Number),
			new TypeDefinition(String),
		], false), [1, "a", {b: true}, /^x$/]);

		assert.deepEqual(match([1, "a", {b: true}, /^x$/], [
			new TypeDefinition(Number),
			new TypeDefinition(String),
			new TypeDefinition(Object),
		], false), [1, "a", {b: true}, /^x$/]);

		assert.deepEqual(match([1, "a", /^x$/], [
			new TypeDefinition([Number, String]),
			new TypeDefinition([Number, String]),
		], false), [1, "a", /^x$/]);

		assert.deepEqual(match([1, 2], [
			new TypeDefinition(Number, 0, 3),
		], true), [[1, 2, 0]]);

		assert.deepEqual(match([{
			a: 1,
			b: false,
			c: {
				d: /^$/,
				e: new Date(0),
			},
		}, /^x$/], [
			new TypeDefinition({
				a: Number,
				b: [Boolean, String],
				c: {
					d: RegExp,
					e: [Date, Function],
				},
			}),
		], false), [{
			a: 1,
			b: false,
			c: {
				d: /^$/,
				e: new Date(0),
			},
		}, /^x$/]);
	});

	it("should reject extra value with strict definitions", function () {
		assert.throws(() => match([1, "a"], [
			new TypeDefinition(Number),
		], true), TypeError);

		assert.throws(() => match([1, "a", {b: true}], [
			new TypeDefinition(Number),
			new TypeDefinition(String),
		], true), TypeError);

		assert.throws(() => match([1, "a", {b: true}, /^x$/], [
			new TypeDefinition(Number),
			new TypeDefinition(String),
			new TypeDefinition(Object),
		], true), TypeError);
	});

	it("should allow optional values everywhere", function () {
		assert.deepEqual(match([1, "a", "b", 2], [
			new TypeDefinition(RegExp, /^x$/),
			new TypeDefinition(Number),
			new TypeDefinition(String, "c", 3),
			new TypeDefinition(Array, [true]),
			new TypeDefinition(Number),
		], true), [/^x$/, 1, ["a", "b", "c"], [true], 2]);

		assert.deepEqual(match([1, "a", {a: 1}], [
			new TypeDefinition([Number, String], 2, 3),
			new TypeDefinition({a: Number}, {a: 0}, 2),
		], true), [[1, "a", 2], [{a: 1}, {a: 0}]]);
	});
});
