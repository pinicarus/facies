"use strict";

const R = require("ramda");

const {
	Interface,
	any,
} = require("./interface");

const {match} = require("./match");

module.exports = Object.freeze({
	Interface,
	any,
	match: R.curryN(2, match),
});
