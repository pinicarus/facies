"use strict";

const R = require("ramda");

const {Interface} = require("./interface");
const {match}     = require("./match");

module.exports = Object.freeze({
	Interface,
	match: R.curryN(2, match),
});
