import { expect, it } from "vitest";
import { isComplexArray } from "./isComplexArray";

it("empty array", () => {
  expect(isComplexArray([])).toBe(false);
});

it("pure array", () => {
  expect(isComplexArray([1, 2, 3])).toBe(false);
});

it("complex array", () => {
  const value = Object.assign([1, 2, 3], { a: 1, b: 2, c: 3 });

  expect(isComplexArray(value)).toBe(true);
});

it("complex array and complex object", () => {
  const value = Object.assign([1, 2, 3], { [Symbol.toStringTag]: "something" });

  expect(isComplexArray(value)).toBe(true);
});

it("complex array and complex object", () => {
  const value = Object.defineProperties([1, 2, 3], {
    a: { value: 1, writable: false },
  });

  expect(isComplexArray(value)).toBe(true);
});

it("complex object", () => {
  const value = {
    [Symbol.toStringTag]: "something",
  };

  expect(isComplexArray(value)).toBe(false);
});
