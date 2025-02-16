//TODO add tests for stringifying and parsing dates in different timezones

import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { dateTransform } from "./dateTransform";

const options = { transforms: [dateTransform] };

it("date", () => {
  const value = new Date();

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("last date", () => {
  const value = new Date(8.64e15);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("invalid date", () => {
  const value = new Date(8.64e15 + 1);

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
