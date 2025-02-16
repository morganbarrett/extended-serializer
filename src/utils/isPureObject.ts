import { isInstanceOf } from "./isInstanceOf";

/**
 * @returns true when the value is a direct instance of `Object`
 */
export const isPureObject = (
  value: unknown
): value is Record<string | number | symbol, unknown> =>
  typeof value === "object" && value !== null && isInstanceOf(value, Object);
