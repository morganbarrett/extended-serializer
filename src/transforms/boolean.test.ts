import { expect, it } from "vitest";
import { clone } from "../clone";

it("true", () => {
  const value = true;

  expect(clone(value)).toEqual(value);
});

it("false", () => {
  const value = false;

  expect(clone(value)).toEqual(value);
});
