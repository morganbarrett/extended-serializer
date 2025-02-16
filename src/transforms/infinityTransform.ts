import { makeTransform } from "../makeTransform";
import { isInfinity } from "../utils";

export const infinityTransform = makeTransform({
  key: "Infinity",
  test: isInfinity,
  encode: Math.sign,
  decode: (sign) => sign * Infinity,
});
