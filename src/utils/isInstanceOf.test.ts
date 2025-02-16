import { expect, it } from "vitest";
import { isInstanceOf } from "./isInstanceOf";

it("instance", () => {
  expect(isInstanceOf(new Boolean(true), Boolean)).toBe(true);
});

it("non direct instance", () => {
  class Bool extends Boolean {}

  expect(isInstanceOf(new Bool(true), Boolean)).toBe(false);
});
