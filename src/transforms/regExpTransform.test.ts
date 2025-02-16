import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { regExpTransform } from "./regExpTransform";

const options = { transforms: [regExpTransform] };

it("empty", () => {
  const value = new RegExp("");

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("regex", () => {
  const value = /a+b*c?/gi;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("last index", () => {
  const value = /a+b*c?/gi;

  value.lastIndex = 5;

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
