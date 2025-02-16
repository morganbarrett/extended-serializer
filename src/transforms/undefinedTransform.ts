import { makeTransform } from "../makeTransform";

export const undefinedTransform = makeTransform({
  key: "undefined",
  test: (value) => value === undefined,
  decode: () => undefined,
});
