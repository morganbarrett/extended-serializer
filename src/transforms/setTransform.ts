import { makeClassTransform } from "../makeTransform";

export const setTransform = makeClassTransform({
  constructor: Set,
  encode: (set, recur) => [[...set.values()].map(recur)],
});
