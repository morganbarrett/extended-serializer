import { expect, it } from "vitest";
import { isNegativeZero } from "./isNegativeZero";

it("negative zero", () => {
  expect(isNegativeZero(-0)).toBe(true);
});

it("positive zero", () => {
  expect(isNegativeZero(0)).toBe(false);
});

it("boolean", () => {
  expect(isNegativeZero(true)).toBe(false);
  expect(isNegativeZero(false)).toBe(false);
});

it("string", () => {
  expect(isNegativeZero("0")).toBe(false);
});

it("primitive class", () => {
  expect(isNegativeZero(new Number(-0))).toBe(false);
});
