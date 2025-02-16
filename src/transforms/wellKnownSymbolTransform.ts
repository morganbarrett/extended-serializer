import { makeValueGroupTransform } from "../makeTransform";

export const wellKnownSymbolTransform = makeValueGroupTransform({
  key: "wellKnownSymbol",
  values: {
    asyncIterator: Symbol.asyncIterator,
    hasInstance: Symbol.hasInstance,
    isConcatSpreadable: Symbol.isConcatSpreadable,
    iterator: Symbol.iterator,
    match: Symbol.match,
    matchAll: Symbol.matchAll,
    replace: Symbol.replace,
    search: Symbol.search,
    species: Symbol.species,
    split: Symbol.split,
    toPrimitive: Symbol.toPrimitive,
    toStringTag: Symbol.toStringTag,
    unscopables: Symbol.unscopables,
    dispose: Symbol.dispose,
    asyncDispose: Symbol.asyncDispose,
  },
});
