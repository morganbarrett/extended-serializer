# Extended Serializer

## Install

`npm install extended-serializer`

## About

Offers support for custom types when serializing and deserializing data.

Validates the data is serializable, see below.

No chance of collisions, escapes any data that is the same shape as custom serialized data.

Includes some common types that can be optionally used, see below.

## Transforms

| Name      | Values                    |
| --------- | ------------------------- |
| undefined | `undefined`               |
| nan       | `NaN`                     |
| infinity  | `Infinity` or `-Infinity` |
| bigint    | `BigInt`                  |
| set       | `Set`                     |
| map       | `Map`                     |
| date      | `Date`                    |
| regexp    | `RegExp`                  |

## Invalid Data

| Type             |                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| symbols          |                                                                                                                                     |
| functions        |                                                                                                                                     |
| non pure arrays  | arrays whose constructor is not `Array` or arrays with non integer properties                                                       |
| non pure objects | objects whose constructor is not `Object` (includes class instances) or objects with getters, setters, or non enumerable properties |

Support for any of these can be added via custom transforms.

The types listed above in transforms are also invalid when the transform is not used.

## Example

```ts
import {
  define,
  Serializer,
  transforms,
  type ExtractType,
} from "extended-serializer";

class Custom {
  constructor(
    public a: number,
    public b: number
  ) {}
}

const customTransforms = {
  ...transforms,
  custom: transform({
    test: (value) => value instanceof Custom,
    serialize: ({ a, b }) => ({ a, b }),
    deserialize: ({ a, b }) => new Custom(a, b),
  }),
};

type Primitive = ExtractType<typeof customTransforms>;

const serializer = new Serializer(customTransforms);

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
} satisfies Primitive;

const encoded = serializer.stringify(value);
const decoded = serializer.parse(encoded);

//decoded is now a deep clone of value
```

## Alternative Work

### tRPC/tupleSON

https://github.com/trpc/tupleson

- Relies on a nonce to prevent collisions
- Doesn't support NaN or Infinity
- Archived

### ScaleForge/joser

https://github.com/ScaleForge/joser

- Relies on a nonce to prevent collisions
- Only supports class types, that must be in global scope
- Doesn't fully validate serializable values
