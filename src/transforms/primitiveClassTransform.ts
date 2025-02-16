import { makeClassGroupTransform } from "../makeTransform";

export const primitiveClassTransform = makeClassGroupTransform({
  key: "primitiveClass",
  classes: { Boolean, Number, String },
  encode: (obj, recur) => [recur(obj.valueOf())],
});
