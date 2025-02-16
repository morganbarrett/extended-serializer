import type {
  InstanceOfClassInRecord,
  MakeClassGroupTransformOptions,
  MakeClassTransformOptions,
  MakeScopedTransformOptions,
  MakeTransformOptions,
  MakeValueGroupTransformOptions,
  Transform,
} from "./types";
import { isInstanceOf } from "./utils";

export const makeTransform = <T, P = null>(
  transform: MakeTransformOptions<T, P>
): Transform<T, P> => transform;

export const makeClassTransform = <T, P extends unknown[]>({
  key,
  constructor,
  encode,
  decode,
}: MakeClassTransformOptions<T, P>): Transform<T, P> => ({
  key: key ?? constructor.name,
  test: (value) => isInstanceOf(value, constructor),
  encode: encode ?? (() => [] as unknown[] as P),
  decode: decode ?? ((args) => new constructor(...args)),
});

export const makeClassGroupTransform = <
  Keys extends string,
  Values extends new (...args: any[]) => any,
  Classes extends Record<Keys, Values>,
  Args extends any[],
>({
  key,
  classes,
  encode,
  decode,
}: MakeClassGroupTransformOptions<Keys, Values, Classes, Args>): Transform<
  InstanceOfClassInRecord<Classes>,
  { key: Keys; args: Args }
> => ({
  key,
  test: (value): value is InstanceOfClassInRecord<Classes> =>
    (Object.values(classes) as Values[]).some((v) => isInstanceOf(value, v)),
  encode: (value, recur) => ({
    key: (Object.keys(classes) as Keys[]).find((v) =>
      isInstanceOf(value, classes[v])
    )!,
    args: encode ? encode(value, recur) : ([] as any[] as Args),
  }),
  decode: ({ key, args }) => {
    const constructor = classes[key];

    if (decode) {
      return decode(constructor, args);
    }

    return new constructor(...args);
  },
});

export const makeValueGroupTransform = <
  Keys extends string,
  Values extends Record<Keys, unknown>,
>({
  key,
  values,
}: MakeValueGroupTransformOptions<Keys, Values>): Transform<
  Values[Keys],
  Keys
> => ({
  key,
  test: (value): value is Values[Keys] => Object.values(values).includes(value),
  encode: (value) =>
    (Object.keys(values) as Keys[]).find((key) => values[key] === value)!,
  decode: (key) => values[key],
});

export const makeScopedTransform = <T, P>({
  key,
  test,
  encode,
  decode,
}: MakeScopedTransformOptions<T, P>): Transform<T, P> => ({
  key,
  test,
  makeEncode: encode,
  makeDecode: decode,
});
