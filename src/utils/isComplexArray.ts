import { isComplexProperty } from "./isComplexObject";
import { isPureArray } from "./isPureArray";

const hasExtraProperties = (value: unknown[]) => {
  const keys = Object.getOwnPropertyNames(value).filter(
    (key) => key !== "length"
  );

  return (
    value.length !== keys.length ||
    keys.some((key) => Number.isNaN(Number(key)))
  );
};

export const isComplexArray = (value: unknown): value is unknown[] =>
  isPureArray(value) &&
  (hasExtraProperties(value) ||
    Object.getOwnPropertySymbols(value).length > 0 ||
    Object.entries(Object.getOwnPropertyDescriptors(value)).some(
      ([key, descriptor]) => key !== "length" && isComplexProperty(descriptor)
    ));
