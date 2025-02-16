import { makeTransform } from "../makeTransform";
import { isNegativeZero } from "../utils";

export const negativeZeroTransform = makeTransform({
  key: "-0",
  test: isNegativeZero,
  decode: () => -0,
});
