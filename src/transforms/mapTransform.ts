import { makeClassTransform } from "../makeTransform";

export const mapTransform = makeClassTransform({
  constructor: Map,
  encode: (map, recur) => [[...map.entries()].map(recur)],
});
