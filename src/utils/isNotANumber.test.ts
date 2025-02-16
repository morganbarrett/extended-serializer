import { expect, it } from "vitest";
import { isNotANumber } from "./isNotANumber";

it("NaN", () => {
  expect(isNotANumber(NaN)).toBe(true);
});

it("Infinity", () => {
  expect(isNotANumber(Infinity)).toBe(false);
});

it("boolean", () => {
  expect(isNotANumber(true)).toBe(false);
  expect(isNotANumber(false)).toBe(false);
});

it("string", () => {
  expect(isNotANumber("NaN")).toBe(false);
});

it("primitive class", () => {
  expect(isNotANumber(new Number(NaN))).toBe(false);
});
