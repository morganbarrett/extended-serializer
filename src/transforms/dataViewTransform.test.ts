import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { arrayBufferTransform } from "./arrayBufferTransform";
import { dataViewTransform } from "./dataViewTransform";

const options = { transforms: [arrayBufferTransform, dataViewTransform] };

it("data view", () => {
  const value = new DataView(new Int8Array([1, 2, 3, 4, 5]).buffer);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
