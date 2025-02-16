import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { errorClassTransform } from "./errorClassTransform";
import { transforms } from "./transforms";

const options = { transforms: [errorClassTransform] };

it("error", () => {
  const value = new Error("message", { cause: { a: 1 } });

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("custom name", () => {
  const value = new Error("message", { cause: { a: 1 } });

  value.name = "SomeError";

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("nested special value", () => {
  const value = new Error("message", {
    cause: { a: new Date(), b: NaN, [Symbol.toStringTag]: new Set([Infinity]) },
  });

  expect(() => encode(value)).toThrow();
  expect(clone(value, { transforms })).toEqual(value);
});
