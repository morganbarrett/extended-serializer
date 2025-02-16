import { expect, it } from "vitest";
import { encode } from "./stringify";

it("multiple transforms with same key", () => {
  const transform = {
    key: "test",
    test: (value: unknown): value is unknown => true,
  };
  const options = {
    transforms: [{ ...transform }, { ...transform }],
  };

  expect(() => encode(1, options)).toThrow();
});
