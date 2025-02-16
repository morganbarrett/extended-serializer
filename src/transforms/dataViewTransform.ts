import { makeClassTransform } from "../makeTransform";

export const dataViewTransform = makeClassTransform<DataView, any[]>({
  constructor: DataView,
  encode: ({ buffer, byteOffset, byteLength }, recur) => [
    recur(buffer),
    byteOffset,
    byteLength,
  ],
});
