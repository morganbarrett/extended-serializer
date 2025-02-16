/* eslint-disable @typescript-eslint/no-wrapper-object-types */

type Simplify<T> = { [K in keyof T]: T[K] };

export type InstanceOfClassInRecord<T> = Simplify<
  {
    [K in keyof T]: T[K] extends new (...args: any[]) => infer U ? U : never;
  }[keyof T]
>;

type TransformTest<T> = (value: unknown) => value is T;
type TransformEncode<T, P> = (value: T, recur: <T>(value: T) => T) => P;
type TransformDecode<T, P> = (value: P) => T;
type TransformMakeEncode<T, P> = () => TransformEncode<T, P>;
type TransformMakeDecode<T, P> = () => TransformDecode<T, P>;

export type MakeTransformOptions<T, P> = {
  /**The key used internally when encoding and decoding */
  key: string;
  /**Capture test for this transform */
  test: TransformTest<T>;
  /**Encodes value to a primitive representation */
  encode?: TransformEncode<T, P>;
  /**Decodes back to original value */
  decode?: TransformDecode<T, P>;
};

export type MakeClassTransformOptions<T, P extends unknown[]> = {
  /**Will use constructor name if not provided */
  key?: string;
  /**Class to capture */
  constructor: new (...args: any[]) => T;
  /**Will return and empty array if not provided */
  encode?: TransformEncode<T, P>;
  /**Will construct an instance of constructor with value spread as parameters if not provided */
  decode?: TransformDecode<T, P>;
};

export type MakeClassGroupTransformOptions<
  Keys extends string,
  Values extends new (...args: any[]) => any,
  Classes extends Record<Keys, Values>,
  Args extends any[],
> = {
  /**The key used internally when encoding and decoding */
  key: string;
  /**Object of classes to capture */
  classes: Classes;
  /**Will return and empty array if not provided */
  encode?: TransformEncode<InstanceOfClassInRecord<Classes>, Args>;
  //TODO constructor is not being typed correctly
  /**Will construct an instance of constructor with value spread as parameters if not provided */
  decode?: (
    constructor: Values,
    args: Args
  ) => InstanceOfClassInRecord<Classes>;
};

export type MakeValueGroupTransformOptions<
  Keys extends string,
  Values extends Record<Keys, unknown>,
> = {
  /**The key used internally when encoding and decoding */
  key: string;
  /**Object of values to capture */
  values: Values;
};

export type MakeScopedTransformOptions<T, P> = {
  /**The key used internally when encoding and decoding */
  key: string;
  /**Capture test for this transform  */
  test: TransformTest<T>;
  /** Returns function used to encode */
  encode?: TransformMakeEncode<T, P>;
  /**Returns function used to decode */
  decode?: TransformMakeDecode<T, P>;
};

export type Transform<T, P> = {
  key: string;
  test: TransformTest<T>;
  encode?: TransformEncode<T, P>;
  decode?: TransformDecode<T, P>;
  makeEncode?: TransformMakeEncode<T, P>;
  makeDecode?: TransformMakeDecode<T, P>;
};

export type BuiltTransform<T, P, K extends "encode" | "decode"> = {
  key: string;
  test: TransformTest<T>;
} & (K extends "encode"
  ? {
      encode: TransformEncode<T, P>;
    }
  : {
      decode: TransformDecode<T, P>;
    });

export type Validate = (value: unknown) => asserts value is Primitive;

export type SerializeOptions = {
  /**The tag used internally when encoding and decoding */
  tag?: string;
  /**The transforms to be used when encoding and decoding */
  transforms?: Transform<any, any>[];
  /**Extra validation on values before encoding */
  validate?: (value: unknown) => boolean;
};

export type Primitive<Extra = never> =
  | null
  | boolean
  | number
  | string
  | Extra
  | Primitive<Extra>[]
  | { [key: string]: Primitive<Extra> };

export type TransformedPrimitive<Extra = never> = Primitive<
  | undefined
  | bigint
  | symbol
  | Set<TransformedPrimitive<Extra>>
  | Map<TransformedPrimitive<Extra>, TransformedPrimitive<Extra>>
  | Date
  | RegExp
  | ArrayBuffer
  | DataView
  | Boolean
  | Number
  | String
  | Error
  | EvalError
  | RangeError
  | ReferenceError
  | SyntaxError
  | TypeError
  | URIError
  | AggregateError
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
  | { [key: string | number | symbol]: TransformedPrimitive<Extra> }
>;

export type Shape = [string, string, Primitive];
export type ShapeLike = [string, ...Primitive[]];
