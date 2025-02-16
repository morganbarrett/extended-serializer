export const isInstanceOf = <T>(
  value: unknown,
  constructor: new (...args: any[]) => T
): value is T =>
  value instanceof constructor &&
  Object.getPrototypeOf(value) === constructor.prototype;
