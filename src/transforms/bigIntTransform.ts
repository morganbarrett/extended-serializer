import { makeTransform } from "../makeTransform";

export const bigIntTransform = makeTransform({
  key: "BigInt",
  test: (value) => typeof value === "bigint",
  encode: String,
  decode: BigInt,
});
