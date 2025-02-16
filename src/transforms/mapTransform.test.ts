import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { infinityTransform } from "./infinityTransform";
import { mapTransform } from "./mapTransform";
import { nanTransform } from "./nanTransform";

const options = { transforms: [mapTransform] };

it("empty map", () => {
  const value = new Map();

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("map", () => {
  const value = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("nested map", () => {
  const value = new Map([
    ["a", new Map([["b", 1]])],
    ["c", new Map([["d", 2]])],
  ]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("nested transforms", () => {
  const value = new Map([
    ["a", NaN],
    ["b", 5],
    ["c", Infinity],
  ]);
  const newOptions = {
    transforms: [mapTransform, nanTransform, infinityTransform],
  };

  expect(() => encode(value)).toThrow();
  expect(() => encode(value, options)).toThrow();
  expect(clone(value, newOptions)).toEqual(value);
});
