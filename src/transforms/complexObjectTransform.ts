import { makeTransform } from "../makeTransform";
import { isComplexObject } from "../utils";

export const complexObjectTransform = makeTransform({
  key: "complexObject",
  test: isComplexObject,
  encode: (obj, recur) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);

    return recur([
      ...Object.entries(descriptors),
      ...Object.getOwnPropertySymbols(descriptors).map((key) => [
        key,
        descriptors[key],
      ]),
    ]);
  },
  decode: (obj) => Object.defineProperties({}, Object.fromEntries(obj)),
});
