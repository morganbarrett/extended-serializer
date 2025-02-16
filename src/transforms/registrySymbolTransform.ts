import { makeTransform } from "../makeTransform";
import { isRegistrySymbol } from "../utils";

export const registrySymbolTransform = makeTransform({
  key: "registrySymbol",
  test: isRegistrySymbol,
  encode: (sym) => Symbol.keyFor(sym)!,
  decode: Symbol.for,
});
