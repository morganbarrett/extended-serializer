import { expect, it } from "vitest";
import { objectMap } from "./objectMap";

it("object map", () => {
  expect(objectMap({ a: 1, b: 2, c: 3 }, (value) => value + 1)).toEqual({
    a: 2,
    b: 3,
    c: 4,
  });
});
