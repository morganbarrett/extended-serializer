import { makeClassTransform } from "../makeTransform";

export const regExpTransform = makeClassTransform({
  constructor: RegExp,
  encode: ({ source, flags, lastIndex }) => [source, flags, lastIndex] as const,
  decode: ([source, flags, lastIndex]) => {
    const regexp = new RegExp(source, flags);
    regexp.lastIndex = lastIndex;
    return regexp;
  },
});
