import { makeTransform } from "../makeTransform";
import { isComplexArray } from "../utils";

export const complexArrayTransform = makeTransform({
  key: "complexArray",
  test: isComplexArray,
  encode: (arr, recur) => recur(Object.getOwnPropertyDescriptors(arr)),
  decode: (obj) =>
    Object.defineProperties([], obj as unknown as PropertyDescriptorMap),
});
