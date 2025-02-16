import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { negativeZeroTransform } from "./negativeZeroTransform";

const options = { transforms: [negativeZeroTransform] };

it("negative zero", () => {
  const value = -0;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
