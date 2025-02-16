import { makeScopedTransform } from "../makeTransform";

type Reference = Record<any, any> | ((...args: any[]) => any);

export const repeatedReferencesTransform = makeScopedTransform({
  key: "repeatedReferences",
  test: (value) =>
    (typeof value === "object" && value !== null) ||
    typeof value === "function",
  encode: () => {
    const references = new Map<Reference, number>();

    return (value) => {
      if (references.has(value)) {
        return references.get(value)!;
      }

      const id = references.size;

      references.set(value, id);

      //TODO values children won't be encoded
      return { id, value };
    };
  },
  decode: () => {
    const references = new Map<number, Reference>();

    return (value) => {
      if (typeof value === "number") {
        return references.get(value)!;
      }

      references.set(value.id, value.value);

      return value.value;
    };
  },
});
