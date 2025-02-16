export const isNotANumber = (value: unknown): value is number =>
  Number.isNaN(value);
