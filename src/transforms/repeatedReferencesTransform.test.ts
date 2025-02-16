import { it } from "vitest";

it("", () => {});

/*
import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { repeatedReferencesTransform } from "./repeatedReferencesTransform";

const arrRef = [1, 2, 3];
const objRef = { a: 1, b: 2, c: 3 };
const arrArr = [arrRef, arrRef];
const arrObj = { a: arrRef, b: arrRef, c: { d: arrRef } };
const objArr = [objRef, objRef];
const objObj = { a: objRef, b: objRef, c: { d: objRef } };
const options = { transforms: [repeatedReferencesTransform] };

it("ignores null", () => {
  expect(encode(null, { transforms: [repeatedReferencesTransform] })).toBe(
    null
  );
});

it("transformed array array", () => {
expect(() => encode(arrArr)).toThrow();

  const cloned = clone(arrArr, options);
  expect(() => encode(value)).toThrow();
  expect(cloned).toEqual(arrArr);
  expect(cloned[0] === cloned[1]).toEqual(true);
});

it("transformed array object", () => {
expect(() => encode(arrObj)).toThrow();

  const cloned = clone(arrObj, options);
  expect(cloned).toEqual(arrObj);
  expect(cloned.a === cloned.b).toEqual(true);
  expect(cloned.a === cloned.c.d).toEqual(true);
});

it("transformed object array", () => {
expect(() => encode(objArr)).toThrow();

  const cloned = clone(objArr, options);
  expect(cloned).toEqual(objArr);
  expect(cloned[0] === cloned[1]).toEqual(true);
});

it("transformed object object", () => {
expect(() => encode(objObj)).toThrow();

  const cloned = clone(objObj, options);
  expect(cloned).toEqual(objObj);
  expect(cloned.a === cloned.b).toEqual(true);
  expect(cloned.a === cloned.c.d).toEqual(true);
});
*/
