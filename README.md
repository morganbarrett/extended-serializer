# Extended Serializer

## Install

`npm install extended-serializer`

## About

## Example

```ts
import { define, serializer, coreDefinitions } from "extended-serializer";

const { replacer, reviver } = serializer({
  ...coreDefinitions,
  custom: define({
    is: (value) => value instanceof Custom,
    encode: (value) => [value.a, value.b],
    decode: ([a, b]) => new Custom(a, b),
  }),
});

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

const encoded = JSON.stringify(value, replacer);

const decoded = JSON.parse(encoded, reviver);

//decoded is same as value
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
