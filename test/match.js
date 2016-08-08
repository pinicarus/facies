"use strict";

const assert = require("assert");

const TypeDefinition = requireSrc("type-definition");
const match          = requireSrc("match");

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

    assert.deepEqual(match([1, 2, 3], [
      new TypeDefinition(Number, 0, 3),
    ], true), [[1, 2, 3]]);
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

    assert.deepEqual(match([1, 2], [
      new TypeDefinition(Number, 0, 3),
    ], true), [[1, 2, 0]]);
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
});
