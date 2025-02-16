import { expect, it } from "vitest";
import { clone } from "../clone";

it("null", () => {
  const value = null;

  expect(clone(value)).toEqual(value);
});
