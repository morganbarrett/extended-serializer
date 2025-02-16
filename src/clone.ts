import { parse } from "./parse";
import { stringify } from "./stringify";
import type { SerializeOptions } from "./types";

export const clone = <T extends SerializeOptions, V>(
  value: V,
  options: T = {} as T
): V => {
  const encoded = stringify(value, options);
  const decoded = parse(encoded, options);

  return decoded as V;
};
