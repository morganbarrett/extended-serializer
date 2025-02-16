import { expect, it } from "vitest";
import { isShapeLike } from "./isShapeLike";

it("shape like", () => {
  expect(isShapeLike(["$", "a", 1], "$")).toBe(true);
});

it("different tag", () => {
  expect(isShapeLike(["@@", "a", 1], "@@")).toBe(true);
});

it("empty tag", () => {
  expect(isShapeLike(["", "a", 1], "")).toBe(true);
});

it("escaped", () => {
  expect(isShapeLike(["$$", "a", 1], "$")).toBe(true);
});

it("escaped different tag", () => {
  expect(isShapeLike(["@@@", "a", 1], "@@")).toBe(true);
});

it("single element", () => {
  expect(isShapeLike(["$"], "$")).toBe(true);
});

it("no match", () => {
  expect(isShapeLike(["@"], "$")).toBe(false);
});

it("no match", () => {
  expect(isShapeLike([4], "$")).toBe(false);
});
