import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { arrayBufferTransform } from "./arrayBufferTransform";

const options = { transforms: [arrayBufferTransform] };

it("empty buffer", () => {
  const value = new ArrayBuffer();

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("buffer with length", () => {
  const value = new ArrayBuffer(10);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("array buffer", () => {
  const value = new Int8Array([1, 2, 3]).buffer;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
