import { expect, it } from "vitest";
import { isRegistrySymbol } from "./isRegistrySymbol";

it("registry symbol", () => {
  expect(isRegistrySymbol(Symbol.for("something"))).toBe(true);
});

it("local symbol", () => {
  expect(isRegistrySymbol(Symbol("something"))).toBe(false);
});

it("well known symbol", () => {
  expect(isRegistrySymbol(Symbol.iterator)).toBe(false);
});
