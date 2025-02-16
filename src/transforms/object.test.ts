import { expect, it } from "vitest";
import { clone } from "../clone";

it("empty object", () => {
  const value = {};

  expect(clone(value)).toEqual(value);
});

it("object", () => {
  const value = { a: 1, b: 2, c: 3 };

  expect(clone(value)).toEqual(value);
});

it("nested object", () => {
  const value = { a: 1, b: 2, c: 3, d: { e: 4, f: 5, g: { h: 6 } } };

  expect(clone(value)).toEqual(value);
});

it("object with values", () => {
  const value = {
    a: [1, "a"],
    b: {
      c: ["$", "a"],
    },
    d: null,
  };

  expect(clone(value)).toEqual(value);
});
