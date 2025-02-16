import * as util from "node:util";
import { expect, it } from "vitest";
import { clone } from "./clone";
import { encode } from "./stringify";
import { transforms } from "./transforms";

it("symbol", () => {
  expect(() => encode(Symbol("a"))).toThrow();
});

it("function", () => {
  expect(() => encode(() => {})).toThrow();
});

it("getter function", () => {
  expect(() =>
    encode({
      get x() {
        return 3;
      },
    })
  ).toThrow();
});

it("setter function", () => {
  expect(() =>
    encode({
      set x(value: number) {},
    })
  ).toThrow();
});

it("class instance", () => {
  expect(() => encode(new (class {})())).toThrow();
});

it("custom validate function", () => {
  const value = new Proxy({}, {});
  const options = { validate: (value: unknown) => !util.types.isProxy(value) };

  expect(() => encode(value, options)).toThrow();
});

it("integration", () => {
  const value = {
    [Symbol.toStringTag]: "something",
    a: ["$", "a"],
    b: {
      c: ["$", "b"],
    },
    d: null,
    e: new Date(),
    f: new Set([
      1,
      2,
      new Set(["a", "b"]),
      {
        g: new Map<string, any>([["a", new Date()]]),
      },
    ]),
    h: Symbol.for("a"),
    i: {
      j: new Int16Array([1, 2, 3]),
      k: Object.assign([1, 2, 3], { a: 1, b: 2, c: new Set([/abc*d?e/gi]) }),
    },
  };

  expect(
    clone(value, {
      transforms,
    })
  ).toEqual(value);
});
