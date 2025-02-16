import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { undefinedTransform } from "./undefinedTransform";

const options = { transforms: [undefinedTransform] };

it("undefined", () => {
  const value = undefined;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
