import { type Validate } from "./types";
import {
  isComplexArray,
  isComplexObject,
  isInfinity,
  isNegativeZero,
  isNotANumber,
  isPureArray,
  isPureObject,
} from "./utils";

export const makeValidate = (): Validate => {
  const references = new WeakSet();

  return (value) => {
    switch (typeof value) {
      case "boolean":
      case "string": {
        return;
      }
      case "undefined": {
        throw new Error("undefined is not serializable");
      }
      case "symbol": {
        throw new Error("Symbols are not serializable");
      }
      case "function": {
        throw new Error("Functions are not serializable");
      }
      case "bigint": {
        throw new Error("Bigints are not serializable");
      }
      case "number": {
        if (isNotANumber(value)) {
          throw new Error("NaN is not serializable");
        }

        if (isInfinity(value)) {
          throw new Error("Infinity is not serializable");
        }

        if (isNegativeZero(value)) {
          throw new Error("-0 is not serializable");
        }

        return;
      }
      case "object": {
        if (value === null) {
          return;
        }

        if (references.has(value)) {
          throw new Error("Repeated references are not serializable");
        }

        references.add(value);

        if (isPureArray(value)) {
          if (isComplexArray(value)) {
            throw new Error("Complex arrays are not serializable");
          }

          return;
        }

        if (isPureObject(value)) {
          if (isComplexObject(value)) {
            throw new Error("Complex objects are not serializable");
          }

          return;
        }

        throw new Error("Class instances are not serializable");
      }
    }
  };
};
