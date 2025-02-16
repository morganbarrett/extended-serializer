import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { infinityTransform } from "./infinityTransform";
import { mapTransform } from "./mapTransform";
import { nanTransform } from "./nanTransform";
import { setTransform } from "./setTransform";
import { undefinedTransform } from "./undefinedTransform";

const options = { transforms: [setTransform] };

it("empty set", () => {
  const value = new Set();

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("set", () => {
  const value = new Set([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("nested set", () => {
  const value = new Set([new Set([1, 2, 3]), new Set([4, 5, 6])]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("nested transforms", () => {
  const value = new Set([
    null,
    undefined,
    NaN,
    Infinity,
    {
      a: new Set([new Map()]),
    },
  ]);
  const newOptions = {
    transforms: [
      setTransform,
      infinityTransform,
      nanTransform,
      undefinedTransform,
      mapTransform,
    ],
  };

  expect(() => encode(value)).toThrow();
  expect(() => encode(value, options)).toThrow();
  expect(clone(value, newOptions)).toEqual(value);
});
