"use strict";

const assert = require("assert");

const {Interface} = requireSrc("interface");
const {match}     = requireSrc("match");

describe("match", function () {
	describe("direct types", function () {
		it("should match values", function () {
			const symbol = Symbol();
			const arrow  = () => {};

			const values = match([
				undefined,
				null,
				Boolean,
				Boolean,
				Number,
				Number,
				String,
				Symbol,
				Function,
			], [
				undefined,
				null,
				true,
				false,
				0,
				1,
				"",
				symbol,
				arrow,
			]);

			assert.deepEqual(values, [
				undefined,
				null,
				true,
				false,
				0,
				1,
				"",
				symbol,
				arrow,
			]);
		});

		it("should match all default values", function () {
			const values = match([
				[undefined, 42],
				[null,      42],
				[Boolean,   42],
				[Boolean,   42],
				[Number,    42],
				[Number,    42],
				[String,    42],
				[Symbol,    42],
				[Function,  42],
			], []);

			assert.equal(values.length, 9);
			assert(values.every((value) => value === 42));
		});
	});

	describe("interface types", function () {
		it("should match values", function () {
			const symbol = Symbol();
			const arrow  = () => {};

			const values = match([
				Interface(undefined),
				Interface(null),
				Interface(Boolean),
				Interface(Boolean),
				Interface(Number),
				Interface(Number),
				Interface(String),
				Interface(Symbol),
				Interface(Function),
			], [
				undefined,
				null,
				true,
				false,
				0,
				1,
				"",
				symbol,
				arrow,
			]);

			assert.deepEqual(values, [
				undefined,
				null,
				true,
				false,
				0,
				1,
				"",
				symbol,
				arrow,
			]);
		});

		it("should match all default values", function () {
			const values = match([
				[Interface(undefined), 42],
				[Interface(null),      42],
				[Interface(Boolean),   42],
				[Interface(Boolean),   42],
				[Interface(Number),    42],
				[Interface(Number),    42],
				[Interface(String),    42],
				[Interface(Symbol),    42],
				[Interface(Function),  42],
			], []);

			assert.equal(values.length, 9);
			assert(values.every((value) => value === 42));
		});
	});

	it("should match values against multiple interfaces", function () {
		const symbol = Symbol();
		const arrow  = () => {};

		const values = match([
			[undefined],
			[Interface(Boolean, null)],
			[Interface(Number, Boolean)],
			[Interface(Boolean, Number)],
			[Interface(Number)],
			[Interface(String, Number)],
			[Interface(undefined, String)],
			[Interface(Symbol, Function)],
			[Interface(null, Function)],
		], [
			undefined,
			null,
			true,
			false,
			0,
			1,
			"",
			symbol,
			arrow,
		]);

		assert.deepEqual(values, [
			undefined,
			null,
			true,
			false,
			0,
			1,
			"",
			symbol,
			arrow,
		]);
	});

	it("should skip values matching their default", function () {
		const values = match([
			Interface(Number),
			[Interface(String),  "default"],
			[Interface(Boolean), true],
			Interface({
				forEach: Function,
				map:     Function,
				reduce:  Function,
			}),
		], [
			42,
			[33],
		]);

		assert.deepEqual(values, [42, "default", true, [33]]);
	});

	describe("errors", function () {
		const check = (type, message) => (error) => error instanceof type && error.message === message;

		it("should fail to match invalid interface w/o default value", function () {
			assert.throws(() => match([Number],         ["foo"]),    check(TypeError, "wrong type for argument #1"));
			assert.throws(() => match([Number, String], [1, 2]),     check(TypeError, "wrong type for argument #2"));
			assert.throws(() => match([Number, String], ["foo", 1]), check(TypeError, "wrong type for argument #1"));
		});

		it("should fail to match missing value", function () {
			assert.throws(() => match([Number, Number], [1]), check(TypeError, "missing argument #2"));
		});

		it("should fail if not all values match", function () {
			assert.throws(() => match([
				Number,
				[String, "foo"],
			], [1, 2]), check(TypeError, "argument not matched: 2"));
			assert.throws(() => match([
				[Number, 42],
				String,
				[Number, 33],
			], [1, "foo", "bar", "baz"]), check(TypeError, "arguments not matched: bar,baz"));
		});
	});
});
