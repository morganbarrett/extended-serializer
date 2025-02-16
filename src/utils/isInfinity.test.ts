import { expect, it } from "vitest";
import { isInfinity } from "./isInfinity";

it("positive infinity", () => {
  expect(isInfinity(Infinity)).toBe(true);
});

it("negative infinity", () => {
  expect(isInfinity(-Infinity)).toBe(true);
});

it("NaN", () => {
  expect(isInfinity(NaN)).toBe(false);
});

it("number", () => {
  expect(isInfinity(5)).toBe(false);
});

it("boolean", () => {
  expect(isInfinity(true)).toBe(false);
  expect(isInfinity(false)).toBe(false);
});

it("string", () => {
  expect(isInfinity("")).toBe(false);
  expect(isInfinity("Infinity")).toBe(false);
});

it("primitive class", () => {
  expect(isInfinity(new Number(Infinity))).toBe(false);
});
