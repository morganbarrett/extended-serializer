import { expect, it } from "vitest";
import { isPureArray } from "./isPureArray";

it("empty array", () => {
  expect(isPureArray([])).toBe(true);
});

it("pure array", () => {
  expect(isPureArray([1, 2, 3])).toBe(true);
});

it("complex array", () => {
  const value = Object.assign([1, 2, 3], {
    a: 1,
    b: 2,
    c: 3,
  });

  expect(isPureArray(value)).toBe(true);
});

it("extends array", () => {
  class Arr extends Array {}

  expect(isPureArray(new Arr())).toBe(false);
});

it("object", () => {
  expect(isPureArray({ a: 1, b: 2, c: 3 })).toBe(false);
});

it("object with Array prototype", () => {
  const value = { a: 1, b: 2, c: 3 };

  Object.setPrototypeOf(value, Array.prototype);

  expect(isPureArray(value)).toBe(false);
});
