import { expect, it } from "vitest";
import { clone } from "../clone";
import { encode } from "../stringify";
import { registrySymbolTransform } from "./registrySymbolTransform";

const options = { transforms: [registrySymbolTransform] };

it("registry symbol", () => {
  const value = Symbol.for("something");

  expect(() => encode(value)).toThrow();
  expect(clone(value, options)).toEqual(value);
});
