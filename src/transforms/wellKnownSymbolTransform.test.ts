import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { wellKnownSymbolTransform } from "./wellKnownSymbolTransform";

const options = { transforms: [wellKnownSymbolTransform] };

it("inside array", () => {
  const value = [Symbol.asyncDispose];

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("inside object", () => {
  const value = { a: Symbol.asyncDispose };

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.asyncIterator", () => {
  const value = Symbol.asyncIterator;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.hasInstance", () => {
  const value = Symbol.hasInstance;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.isConcatSpreadable", () => {
  const value = Symbol.isConcatSpreadable;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.iterator", () => {
  const value = Symbol.iterator;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.match", () => {
  const value = Symbol.match;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.matchAll", () => {
  const value = Symbol.matchAll;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.replace", () => {
  const value = Symbol.replace;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.search", () => {
  const value = Symbol.search;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.species", () => {
  const value = Symbol.species;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.split", () => {
  const value = Symbol.split;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.toPrimitive", () => {
  const value = Symbol.toPrimitive;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.toStringTag", () => {
  const value = Symbol.toStringTag;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.unscopables", () => {
  const value = Symbol.unscopables;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.dispose", () => {
  const value = Symbol.dispose;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Symbol.asyncDispose", () => {
  const value = Symbol.asyncDispose;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
