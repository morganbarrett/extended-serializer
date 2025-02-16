import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { infinityTransform } from "./infinityTransform";
import { nanTransform } from "./nanTransform";
import { primitiveClassTransform } from "./primitiveClassTransform";

const options = { transforms: [primitiveClassTransform] };

it("Boolean", () => {
  const value = new Boolean(true);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Number", () => {
  const value = new Number(5);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("String", () => {
  const value = new String("hi");

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("NaN", () => {
  const value = new Number(NaN);
  const newOptions = { transforms: [primitiveClassTransform, nanTransform] };

  expect(() => encode(value)).toThrow();
  expect(() => encode(value, options)).toThrow();
  expect(clone(value, newOptions)).toEqual(value);
});

it("NaN", () => {
  const value = new Number(Infinity);
  const newOptions = {
    transforms: [primitiveClassTransform, infinityTransform],
  };

  expect(() => encode(value, options)).toThrow();
  expect(clone(value, newOptions)).toEqual(value);
});
