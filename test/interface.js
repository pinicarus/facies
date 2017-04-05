"use strict";

const assert = require("assert");

const {Interface} = requireSrc("interface");

describe("interface", function () {
	it("should match primitive values", function () {
		assert(undefined  instanceof Interface(undefined));
		assert(null       instanceof Interface(null));
		assert(true       instanceof Interface(Boolean));
		assert(false      instanceof Interface(Boolean));
		assert(0          instanceof Interface(Number));
		assert(1          instanceof Interface(Number));
		assert(""         instanceof Interface(String));
		assert(Symbol()   instanceof Interface(Symbol));
		assert((() => {}) instanceof Interface(Function));
	});

	it("should match object types", function () {
		const C = class {};

		assert(new Date()     instanceof Interface(Date));
		assert(new RegExp("") instanceof Interface(RegExp));
		assert(new C()        instanceof Interface(C));
		assert(C              instanceof Interface(Function));

		assert(new Date()     instanceof Interface(Object));
		assert(new RegExp("") instanceof Interface(Object));
		assert(new C()        instanceof Interface(Object));
		assert(C              instanceof Interface(Object));
	});

	it("should match object interfaces", function () {
		const C = class {
			get length() {
				return 0;
			}
		};

		assert(""      instanceof Interface({length: Number}));
		assert(new C() instanceof Interface({length: Number}));
	});

	it("should match nested literals", function () {
		assert({
			a: 1,
			b: [
				{c: ""},
				true,
			],
		} instanceof Interface({
			a: Number,
			b: [
				{c: String},
				Boolean,
			],
		}));

		assert([
			{a: 1},
			{b: ["", {c: true}]},
		] instanceof Interface([
			{a: Number},
			{b: [String, {c: Boolean}]},
		]));
	});

	it("should match nested interfaces", function () {
		assert(undefined  instanceof Interface(Interface(undefined)));
		assert(null       instanceof Interface(Interface(null)));
		assert(true       instanceof Interface(Interface(Boolean)));
		assert(false      instanceof Interface(Interface(Boolean)));
		assert(0          instanceof Interface(Interface(Number)));
		assert(1          instanceof Interface(Interface(Number)));
		assert(""         instanceof Interface(Interface(String)));
		assert(Symbol()   instanceof Interface(Interface(Symbol)));
		assert((() => {}) instanceof Interface(Interface(Function)));

		assert(undefined  instanceof Interface(Interface(Interface(undefined))));
		assert(null       instanceof Interface(Interface(Interface(null))));
		assert(true       instanceof Interface(Interface(Interface(Boolean))));
		assert(false      instanceof Interface(Interface(Interface(Boolean))));
		assert(0          instanceof Interface(Interface(Interface(Number))));
		assert(1          instanceof Interface(Interface(Interface(Number))));
		assert(""         instanceof Interface(Interface(Interface(String))));
		assert(Symbol()   instanceof Interface(Interface(Interface(Symbol))));
		assert((() => {}) instanceof Interface(Interface(Interface(Function))));

		assert(true       instanceof Interface(Number, Interface(String, Interface(Symbol, Boolean))));
	});

	it("should fail to match invalid primitive values", function () {
		assert(!(undefined instanceof Interface(null)));
		assert(!(null      instanceof Interface(undefined)));
		assert(!(undefined instanceof Interface(Boolean)));
		assert(!(null      instanceof Interface(Boolean)));
		assert(!("1"       instanceof Interface(Number)));
	});
});
