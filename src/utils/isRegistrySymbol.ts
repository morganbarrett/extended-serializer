export const isRegistrySymbol = (value: unknown): value is symbol =>
  typeof value === "symbol" && Symbol.keyFor(value) !== undefined;
