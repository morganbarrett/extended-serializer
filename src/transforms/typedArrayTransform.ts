import { makeClassGroupTransform } from "../makeTransform";

export const typedArrayTransform = makeClassGroupTransform({
  key: "typedArray",
  classes: {
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    BigInt64Array,
    BigUint64Array,
  },
  encode: (array, recur) => [recur(array.buffer)],
});
