# Extended Serializer

## Install

`npm install extended-serializer`

## About

Offers support for custom types when serializing and deserializing data.

Includes some common types that can be optionally used, such as `undefined`, `NaN`, `Infinity`, `BigInt`, `Set`, `Map`, and `Date`.

When writing custom types, the `is` function tests if the value is one that you want to capture, then the `encode` function takes a value and should return a primitive representation of it, then the `decode` function should take the primitive made by `encode` and reconstruct the original value from it.

## Example

```ts
import {
  define,
  Serializer,
  coreDefinitions,
  type ExtractType,
} from "extended-serializer";

const definitions = {
  ...coreDefinitions,
  custom: define({
    is: (value) => value instanceof Custom,
    encode: (value) => [value.a, value.b],
    decode: ([a, b]) => new Custom(a, b),
  }),
};

type Primitive = ExtractType<typeof definitions>;

const serializer = new Serializer(definitions);

const value = {
  a: NaN,
  b: Infinity,
  c: new Set([1, 2, 3]),
  d: new Map([
    ["a", 1],
    ["b", 2],
  ]),
  e: new Date(),
  f: new Custom(1, 2),
};

const encoded = serializer.stringify(value);
const decoded = serializer.parse(encoded);

//decoded is now a deep clone of value
```

## Core Definitions

| Name      | Values                    |
| --------- | ------------------------- |
| undefined | `undefined`               |
| nan       | `NaN`                     |
| infinity  | `Infinity` or `-Infinity` |
| bigint    | `BigInt`                  |
| set       | `Set`                     |
| map       | `Map`                     |
| date      | `Date`                    |
