import { makeTransform } from "../makeTransform";
import { isNotANumber } from "../utils";

export const nanTransform = makeTransform({
  key: "NaN",
  test: isNotANumber,
  decode: () => NaN,
});
