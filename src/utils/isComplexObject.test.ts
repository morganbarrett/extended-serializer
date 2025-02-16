import { expect, it } from "vitest";
import { isComplexObject } from "./isComplexObject";

it("pure object", () => {
  expect(isComplexObject({ a: 1, b: 2, c: 3 })).toBe(false);
});

it("object with lone symbol keys", () => {
  const value = { [Symbol.toStringTag]: "something" };

  expect(isComplexObject(value)).toBe(true);
});

it("object with symbol keys", () => {
  const value = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.toStringTag]: "something",
  };

  expect(isComplexObject(value)).toBe(true);
});

it("object with weird descriptor", () => {
  const value = Object.defineProperties(
    {},
    {
      a: {
        value: 1,
        writable: false,
      },
    }
  );

  expect(isComplexObject(value)).toBe(true);
});

it("compelex array", () => {
  const value = Object.assign([1, 2, 3], { a: 1, b: 2, c: 3 });

  expect(isComplexObject(value)).toBe(false);
});

it("compelex class instance", () => {
  const value = {
    [Symbol.toStringTag]: "something",
  };

  Object.setPrototypeOf(value, Date.prototype);

  expect(isComplexObject(value)).toBe(false);
});
