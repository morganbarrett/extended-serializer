import { isPureObject } from "./isPureObject";

export const isComplexProperty = (descriptor: PropertyDescriptor) =>
  !descriptor.writable ||
  !descriptor.enumerable ||
  !descriptor.configurable ||
  descriptor.get !== undefined ||
  descriptor.set !== undefined;

export const isComplexObject = (
  value: unknown
): value is Record<string | number | symbol, unknown> =>
  isPureObject(value) &&
  (Object.getOwnPropertySymbols(value).length > 0 ||
    Object.values(Object.getOwnPropertyDescriptors(value)).some(
      isComplexProperty
    ));
