import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { nanTransform } from "./nanTransform";

const options = { transforms: [nanTransform] };

it("not a number", () => {
  const value = NaN;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
