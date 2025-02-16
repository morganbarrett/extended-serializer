export const objectMap = <T, U>(
  obj: Record<string | number | symbol, T>,
  fn: (value: T) => U
): Record<string | number | symbol, U> =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)])
  );
