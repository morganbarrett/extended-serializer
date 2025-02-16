import { expect, it } from "vitest";
import { isPureObject } from "./isPureObject";

it("empty object", () => {
  expect(isPureObject({})).toBe(true);
});

it("pure object", () => {
  expect(isPureObject({ a: 1, b: 2, c: 3 })).toBe(true);
});

it("extends object", () => {
  class Obj extends Object {}

  expect(isPureObject(new Obj())).toBe(false);
});

it("array", () => {
  expect(isPureObject([1, 2, 3])).toBe(false);
});

it("object with Array prototype", () => {
  const value = { a: 1, b: 2, c: 3 };

  Object.setPrototypeOf(value, Array.prototype);

  expect(isPureObject(value)).toBe(false);
});
