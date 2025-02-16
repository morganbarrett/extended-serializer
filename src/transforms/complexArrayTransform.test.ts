import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { complexArrayTransform } from "./complexArrayTransform";
import { transforms } from "./transforms";

const options = { transforms: [complexArrayTransform] };

it("properties", () => {
  const value = Object.assign([1, 2, 3], { a: 1, b: 2, c: 3 });

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("empty sparse", () => {
  // eslint-disable-next-line no-sparse-arrays
  const value = Object.assign([,]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("sparse", () => {
  // eslint-disable-next-line no-sparse-arrays
  const value = Object.assign([1, , 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("combined with complex object symbol keys", () => {
  const value = Object.assign([1, 2, 3], { [Symbol.toStringTag]: "something" });

  expect(() => encode(value)).toThrow();
  expect(() => encode(value, options)).toThrow();
  expect(clone(value, { transforms })).toEqual(value);
});

it("combined with complex object non standard descriptor", () => {
  const value = Object.defineProperties([1, 2, 3], {
    a: { value: 1, writable: false },
  });

  expect(() => encode(value)).toThrow();
  expect(clone(value, { transforms })).toEqual(value);
});
