import { makeClassTransform } from "../makeTransform";

export const dateTransform = makeClassTransform({
  constructor: Date,
  encode: (date) => {
    try {
      return [date.toISOString()];
    } catch (e) {
      return [Number.MAX_SAFE_INTEGER];
    }
  },
});
