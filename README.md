# Facies

`facies` is a featureful parameters signature module for [nodejs](https://nodejs.org).

[![NPM Summary](https://nodei.co/npm/facies.png)](https://www.npmjs.com/package/facies)
[![NPM Downloads](https://nodei.co/npm-dl/facies.png?months=1)](https://www.npmjs.com/package/facies)

[![Build Status](https://travis-ci.org/pinicarus/facies.svg?branch=master)](https://travis-ci.org/pinicarus/facies)
[![Coverage Status](https://coveralls.io/repos/github/pinicarus/facies/badge.svg?branch=master)](https://coveralls.io/github/pinicarus/facies?branch=master)

## Features

- Duck type matching
- Default values

See the [changelog](https://github.com/pinicarus/facies/blob/master/CHANGELOG.md) and the
[API reference](https://github.com/pinicarus/facies/blob/master/API.md)

## Requirements

`facies` works with NodeJS 6.x and above. Install it the usual way:

```
npm install facies
```

## How To

`facies` is designed for use with array-like values, e.g. the `arguments`
keyword:

```javascript
const facies = require("facies");

const target = function () {
	const parameters = facies.match([
		Number,
		[String, "a"],
	], arguments);

	// parameters is an array:
	// - [0] is a Number
	// - [1] is a string with default value "a"
};
```

It works by matching the given values against a list of interface definitions.
Interface definitions are constructed either from a type constructor for exact
matching or from a literal object describing the expected interface. So both
`String` and `{length: Function}` will match strings.

Interface definitions can be given in an array where the last value will be the
default value used if none of the other values match the corresponding value.
Multiple interface definitions can also be bundled together using the variadic
`Interface` construct, which responds to the `instanceof` operator:

```javascript
[]         instanceof facies.Interface({forEach: Function}); // true
new Map()  instanceof facies.Interface({forEach: Function}); // true
/^$/       instanceof facies.Interface(RegExp, Date);        // true
new Date() instanceof facies.Interface(RegExp, Date);        // true
```

If actual values do not match the expected interface definition, `facies.match`
will also throw a `TypeError`. If more values are given than the result of
matching (including default values), `facies.match` will also throw a
`TypeError`.

The `facies.match` function is currified using [Ramda](http://ramdajs.com/), so
that it can be partially applied to the interface expectation if needed.
