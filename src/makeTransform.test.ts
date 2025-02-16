import { expect, it } from "vitest";
import { clone } from "./clone";
import { makeClassGroupTransform, makeClassTransform } from "./makeTransform";

class Singleton {
  a = 1;
  b = 2;
  c = 3;
}

it("makeClassTransform without encode", () => {
  const value = new Singleton();
  const options = {
    transforms: [
      makeClassTransform({
        constructor: Singleton,
      }),
    ],
  };

  expect(clone(value, options)).toEqual(value);
});

it("makeClassGroupTransform without encode", () => {
  const value = new Singleton();
  const options = {
    transforms: [
      makeClassGroupTransform({
        key: "Singleton",
        classes: { Singleton },
      }),
    ],
  };

  expect(clone(value, options)).toEqual(value);
});
