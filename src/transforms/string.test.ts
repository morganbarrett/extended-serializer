import { expect, it } from "vitest";
import { clone } from "../clone";

it("empty string", () => {
  const value = "";

  expect(clone(value)).toEqual(value);
});

it("string", () => {
  const value = "hi";

  expect(clone(value)).toEqual(value);
});

it("new lines", () => {
  const value = "hello\nworld";

  expect(clone(value)).toEqual(value);
});

it("tag string", () => {
  const value = "$";

  expect(clone(value)).toEqual(value);
});
