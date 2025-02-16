import type { BuiltTransform, SerializeOptions } from "./types";

const defaultTag = "$";

export function buildOptions<K extends "encode" | "decode">(
  options: SerializeOptions,
  key: K
) {
  const keys = new Set<string>();
  const transforms: BuiltTransform<any, any, K>[] = [];

  for (const transform of options.transforms ?? []) {
    if (keys.has(transform.key)) {
      throw new Error(`Transform key ${transform.key} is not unique`);
    }

    keys.add(transform.key);

    //TODO type hack
    transforms.push({
      key: transform.key,
      test: transform.test,
      [key]:
        transform[key] ??
        transform[key === "encode" ? "makeEncode" : "makeDecode"]?.() ??
        (() => null),
    } as unknown as BuiltTransform<any, any, K>);
  }

  return {
    tag: options.tag ?? defaultTag,
    transforms,
  };
}
