import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { bigIntTransform } from "./bigIntTransform";

const options = { transforms: [bigIntTransform] };

it("zero", () => {
  const value = 0n;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("positive", () => {
  const value = 5n;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("negative", () => {
  const value = -5n;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("really big", () => {
  const value = 123456789123456789123456789123456789n;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
