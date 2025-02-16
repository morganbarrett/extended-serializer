import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { arrayBufferTransform } from "./arrayBufferTransform";
import { typedArrayTransform } from "./typedArrayTransform";

const options = { transforms: [arrayBufferTransform, typedArrayTransform] };

it("empty", () => {
  const value = new Int8Array();

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("with length", () => {
  const value = new Int8Array(10);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Int8Array", () => {
  const value = new Int8Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Uint8Array", () => {
  const value = new Uint8Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Uint8ClampedArray", () => {
  const value = new Uint8ClampedArray([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Int16Array", () => {
  const value = new Int16Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Uint16Array", () => {
  const value = new Uint16Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Int32Array", () => {
  const value = new Int32Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Uint32Array", () => {
  const value = new Uint32Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Float32Array", () => {
  const value = new Float32Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("Float64Array", () => {
  const value = new Float64Array([1, 2, 3]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("BigInt64Array", () => {
  const value = new BigInt64Array([1n, 2n, 3n]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("BigUint64Array", () => {
  const value = new BigUint64Array([1n, 2n, 3n]);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
