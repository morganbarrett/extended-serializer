import { isInstanceOf } from "./isInstanceOf";

/**
 * @returns true when the value is a direct instance of `Array`
 */
export const isPureArray = (value: unknown): value is unknown[] =>
  Array.isArray(value) && isInstanceOf(value, Array);
