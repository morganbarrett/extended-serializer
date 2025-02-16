import { buildOptions } from "./buildOptions";
import { makeValidate } from "./makeValidate";
import type { Primitive, SerializeOptions, Validate } from "./types";
import { isPureArray, isPureObject, isShapeLike, objectMap } from "./utils";

/**
 * Acts as a drop in replacement for `JSON.stringify`, with encoder built in.
 */
export const stringify = <T extends SerializeOptions>(
  value: unknown,
  options: T = {} as T
): string => JSON.stringify(encode(value, options));

export const encode = <T extends SerializeOptions>(
  value: unknown,
  options: T = {} as T
): Primitive => {
  const { tag, transforms } = buildOptions(options, "encode");
  const validate: Validate = makeValidate();

  const recur = (value: unknown): Primitive => {
    if (options.validate && !options.validate(value)) {
      throw new Error("Invalid value");
    }

    //encode special values
    for (const transform of transforms) {
      if (transform.test(value)) {
        return [
          tag,
          transform.key,
          transform.encode(value, recur as <T>(value: T) => T),
        ];
      }
    }

    validate(value);

    //escape matching shapes
    if (isShapeLike(value, tag)) {
      return [`${tag}${value[0]}`, ...value.slice(1).map(recur)];
    }

    if (isPureArray(value)) {
      return value.map(recur);
    }

    if (isPureObject(value)) {
      return objectMap(value, recur);
    }

    return value;
  };

  return recur(value);
};
