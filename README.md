# Facies

`facies` is a featureful parameters signature module for
[nodejs](https://nodejs.org).

[![NPM Summary](https://nodei.co/npm/facies.png)](https://www.npmjs.com/package/facies)
[![NPM Downloads](https://nodei.co/npm-dl/facies.png?months=1)](https://www.npmjs.com/package/facies)

[![Build Status](https://travis-ci.org/pinicarus/facies.svg?branch=master)](https://travis-ci.org/pinicarus/facies)
[![Coverage Status](https://coveralls.io/repos/github/pinicarus/facies/badge.svg?branch=master)](https://coveralls.io/github/pinicarus/facies?branch=master)

## Features

- Type matching
- Default values
- Multiple values matching

See the [changelog](https://github.com/pinicarus/facies/blob/master/CHANGELOG.md) and the
[API reference](https://github.com/pinicarus/facies/blob/master/API.md)

## Requirements

`facies` works with NodeJS 4.x and above. Install it the usual way:

```
npm install facies
```

## How To

`facies` is designed for use with array-like values, e.g. the `arguments`
keyword:

```javascript
const facies = require("facies");

const target = function () {
  const parameters = facies.match(arguments, [
    new facies.TypeDefinition(Number),
	 new facies.TypeDefinition(String, "a"),
  ]);

  // parameters is an array:
  // - [0] is a Number
  // - [1] is a string with default value "a"
};
```

It works by matching the given values against a list of type definitions.
Type definitions are constructor from a type constructor. Optional, they may be
followed by a default value in case no actual value can be matched. Default
values must be `null` or match the type constructor or `facies.match` will
throw a `TypeError`.

If actual values do not match the expected type definition, `facies.match` will
also throw a `TypeError`.

Type definitions may also have a third optional argument, which is the number
of successive values to match:

```javascript
// matches three numbers, using 0 if less are given.
new TypeDefinition(Number, 0, 3)
```

By default, any value not matched by a type definition will be appended to the
result value of `facies.match`. This can be mitigate by providing a third
boolean argument indicating whether the type definitions are supposed to match
the whole set of given values. In `true`, extra values will be considered an
error and `facies.match` will throw a `TypeError`.
