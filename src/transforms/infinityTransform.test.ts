import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { infinityTransform } from "./infinityTransform";

const options = { transforms: [infinityTransform] };

it("positive infinity", () => {
  const value = Infinity;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("negative infinity", () => {
  const value = -Infinity;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
