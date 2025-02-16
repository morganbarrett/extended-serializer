import { expect, it } from "vitest";
import { clone } from "../clone";

it("zero", () => {
  const value = 0;

  expect(clone(value)).toEqual(value);
});

it("positive integer", () => {
  const value = 5;

  expect(clone(value)).toEqual(value);
});

it("negative integer", () => {
  const value = -5;

  expect(clone(value)).toEqual(value);
});

it("decimal", () => {
  const value = 3.14;

  expect(clone(value)).toEqual(value);
});
