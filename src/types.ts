export type Primitive<Extra = never> =
  | null
  | boolean
  | number
  | string
  | Extra
  | Primitive<Extra>[]
  | { [key: string]: Primitive<Extra> };

export type Definition<T, P extends Primitive> = {
  is: (value: unknown) => value is T;
  encode: (value: T, fn: (value: unknown) => Primitive) => P;
  decode: (value: P) => T;
};

export type ExtractType<T> = Primitive<
  {
    [Key in keyof T]: T[Key] extends Definition<infer U, any> ? U : never;
  }[keyof T]
>;
