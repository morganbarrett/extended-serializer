import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { complexArrayTransform } from "./complexArrayTransform";
import { complexObjectTransform } from "./complexObjectTransform";
import { wellKnownSymbolTransform } from "./wellKnownSymbolTransform";

const options = {
  transforms: [complexObjectTransform, wellKnownSymbolTransform],
};

it("symbol keys", () => {
  const value = {
    [Symbol.toStringTag]: "something",
  };

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});

it("non standard descriptor", () => {
  const value = Object.defineProperties(
    {},
    {
      a: {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: false,
      },
    }
  );

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
  expect(Object.getOwnPropertyDescriptors(clone(value, options))).toEqual(
    Object.getOwnPropertyDescriptors(value)
  );
});

it("combined with complex array", () => {
  const value = Object.assign([1, 2, 3], {
    [Symbol.toStringTag]: "something",
  });
  const newOptions = {
    transforms: [
      complexObjectTransform,
      wellKnownSymbolTransform,
      complexArrayTransform,
    ],
  };

  expect(() => encode(value, options)).toThrow();
  expect(clone(value, newOptions)).toEqual(value);
});
