import { buildOptions } from "./buildOptions";
import type { Primitive, SerializeOptions } from "./types";
import {
  isPureArray,
  isPureObject,
  isShape,
  isShapeLike,
  objectMap,
} from "./utils";

/**
 * Acts as a drop in replacement for `JSON.parse`, with decoder built in.
 */
export const parse = <T extends SerializeOptions>(
  value: string,
  options: T = {} as T
): unknown => decode(JSON.parse(value), options);

export const decode = <T extends SerializeOptions>(
  value: Primitive,
  options: T = {} as T
): unknown => {
  const { tag, transforms } = buildOptions(options, "decode");

  const recur = (value: Primitive): unknown => {
    //decode special values
    if (isShape(value, tag)) {
      const [_, key, data] = value;
      const obj = transforms.find((t) => t.key === key);

      if (!obj) {
        throw new Error(`Unknown transform ${key}`);
      }

      return obj.decode(recur(data));
    }

    //unescape matching shapes
    if (isShapeLike(value, tag)) {
      return [value[0].slice(tag.length), ...value.slice(1).map(recur)];
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
