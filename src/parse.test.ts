import { expect, it } from "vitest";
import { decode } from "./parse";
import { encode } from "./stringify";
import { nanTransform } from "./transforms";

it("missing transform", () => {
  const encoded = encode(NaN, { transforms: [nanTransform] });

  expect(() => decode(encoded)).toThrow();
});
