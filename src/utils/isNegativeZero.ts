export const isNegativeZero = (value: unknown): value is -0 =>
  Object.is(value, -0);
