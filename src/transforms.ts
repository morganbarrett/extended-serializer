import type { Primitive } from "./validate";

export type Transform<T, P extends Primitive> = {
  test: (value: unknown) => value is T;
  serialize: (value: T) => P;
  deserialize: (value: P) => T;
};

export type ExtractType<T> = Primitive<
  {
    [Key in keyof T]: T[Key] extends Transform<infer U, any> ? U : never;
  }[keyof T]
>;

export const transform = <T, P extends Primitive>(obj: Transform<T, P>) => obj;

export const transforms = {
  undefined: transform({
    test: (value) => value === undefined,
    serialize: () => null,
    deserialize: () => undefined,
  }),
  nan: transform({
    test: (value): value is number => Number.isNaN(value),
    serialize: () => null,
    deserialize: () => NaN,
  }),
  infinity: transform({
    test: (value): value is number =>
      typeof value === "number" && !Number.isFinite(value),
    serialize: Math.sign,
    deserialize: (value) => value * Infinity,
  }),
  bigint: transform({
    test: (value) => typeof value === "bigint",
    serialize: (value) => value.toString(),
    deserialize: (value) => BigInt(value),
  }),
  set: transform({
    test: (value): value is Set<Primitive> => value instanceof Set,
    serialize: (value) => [...value.values()],
    deserialize: (value) => new Set(value),
  }),
  map: transform({
    test: (value): value is Map<Primitive, Primitive> => value instanceof Map,
    serialize: (value) => [...value.entries()],
    deserialize: (value) => new Map(value),
  }),
  date: transform({
    test: (value) => value instanceof Date,
    serialize: (value) => value.toJSON(),
    deserialize: (value) => new Date(value),
  }),
  regexp: transform({
    test: (value) => value instanceof RegExp,
    serialize: ({ source, flags, lastIndex }) => ({ source, flags, lastIndex }),
    deserialize: ({ source, flags, lastIndex }) => {
      const regexp = new RegExp(source, flags);
      regexp.lastIndex = lastIndex;
      return regexp;
    },
  }),
};
