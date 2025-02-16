import { expect, it } from "vitest";
import { isShape } from "./isShape";

it("shape", () => {
  expect(isShape(["$", "a", 1], "$")).toBe(true);
});

it("different tag", () => {
  expect(isShape(["@@", "a", 1], "@@")).toBe(true);
});

it("empty tag", () => {
  expect(isShape(["", "a", 1], "")).toBe(true);
});

it("single element", () => {
  expect(isShape(["$"], "$")).toBe(true);
});

it("no match", () => {
  expect(isShape(["@"], "$")).toBe(false);
});

it("no match", () => {
  expect(isShape([4], "$")).toBe(false);
});

it("escaped", () => {
  expect(isShape(["$$", "a", 1], "$")).toBe(false);
});
