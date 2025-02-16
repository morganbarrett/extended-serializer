import { expect, it } from "vitest";
import { clone } from "../clone";

it("empty array", () => {
  const value: [] = [];

  expect(clone(value)).toEqual(value);
});

it("array", () => {
  const value = [1, 2, 3];

  expect(clone(value)).toEqual(value);
});

it("nested array", () => {
  const value = [1, 2, 3, [4, 5, [6]]];

  expect(clone(value)).toEqual(value);
});

it("tagged array", () => {
  const value = ["$", 1, 2, 3];

  expect(clone(value)).toEqual(value);
});

it("lone tagged array", () => {
  const value = ["$"];

  expect(clone(value)).toEqual(value);
});

it("escaped tagged array", () => {
  const value = ["$$", 1, 2, 3];

  expect(clone(value)).toEqual(value);
});

it("double escaped tagged array", () => {
  const value = ["$$$", 1, 2, 3];

  expect(clone(value)).toEqual(value);
});

it("array with values", () => {
  const value = [["$", "a"], null, "a", 4];

  expect(clone(value)).toEqual(value);
});
