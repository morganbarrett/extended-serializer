# Extended Serializer

## Install

`npm install extended-serializer`

## About

- Extends JSON serialization to support almost all data types.
- Validates all input data to ensure that it is serializable.
- Doesn't rely on a nonce like other solutions, so no chance of collisions.
- Never calls `toJSON` methods.
- Well tested with 100% coverage.

## Transforms

This is an exhastive list of all possible values in JavaScript, and the applicable transforms to make them serializable.

| Type                                    | Values                                              | Applicable transform              | Notes                                                                                  |
| --------------------------------------- | --------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------- |
| `null` value                            | `null`                                              | none needed                       |                                                                                        |
| `boolean` primitive type                | `true` or `false`                                   | none needed                       |                                                                                        |
| `string` primitive type                 | e.g. `"hello"`                                      | none needed                       |                                                                                        |
| `number` primitive type                 | e.g. `5`                                            | none needed                       | except NaN, Infinity, -0                                                               |
| `Object` instance                       | e.g. `{a: 1, b: 2, c: 3}`                           | none needed                       | except complex `Object` instances or repeated references                               |
| `Array` instance                        | e.g. `[1, 2, 3]`                                    | none needed                       | except complex `Array` instances or repeated references                                |
| `-0` value                              | `-0`                                                | `negativeZeroTransform`           |                                                                                        |
| `NaN` value                             | `NaN`                                               | `nanTransform`                    |                                                                                        |
| `Infinity` value                        | `Infinity` or `-Infinity`                           | `infinityTransform`               |                                                                                        |
| `undefined` primitive type              | `undefined`                                         | `undefinedTransform`              |                                                                                        |
| `bigint` primitive type                 | e.g. `5n`                                           | `bigIntTransform`                 |                                                                                        |
| complex `Object` instance               | e.g. `{[Symbol.toStringTag]: "something"}`          | `complexObjectTransform`          | an object with symbol keys, or non standard property descriptors                       |
| complex `Array` instance                | e.g. `Object.assign([1, 2, 3], {a: 1, b: 2, c: 3})` | `complexArrayTransform`           | an array with extra or missing properties                                              |
| ~~repeated and circular references~~    | ~~e.g. `[value, value]`~~                           | ~~`repeatedReferencesTransform`~~ | NOT FINISHED ~~should be first transform included~~                                    |
| global registry `symbol` primitive type | e.g. `Symbol.for("something")`                      | `registrySymbolTransform`         | you may want to omit this transform if encoding and decoding in different environments |
| well known `symbol` primitive type      | e.g. `Symbol.iterator`                              | `wellKnownSymbolTransform`        |                                                                                        |
| local `symbol` primitive type           | e.g. `Symbol("something")`                          | requires custom transform         |                                                                                        |
| `function` primitive type               | e.g. `() => true`                                   | requires custom transform         |                                                                                        |
| class instance                          | e.g. `new CustomClass()`                            | requires custom transform         |                                                                                        |

### JS built-in class instances

| Class                                                                                                                                                                       | Transform                 | Notes                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------ |
| `Set`                                                                                                                                                                       | `setTransform`            |                                      |
| `Map`                                                                                                                                                                       | `mapTransform`            |                                      |
| `Date`                                                                                                                                                                      | `dateTransform`           |                                      |
| `RegExp`                                                                                                                                                                    | `regExpTransform`         |                                      |
| `ArrayBuffer`                                                                                                                                                               | `arrayBufferTransform`    |                                      |
| `DataView`                                                                                                                                                                  | `dataViewTransform`       |                                      |
| `Boolean`, `Number`, `String`                                                                                                                                               | `primitiveClassTransform` |                                      |
| `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, `URIError`, `AggregateError`                                                              | `errorClassTransform`     | won't encode not standard properties |
| `Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `Float32Array`, `Float64Array`, `BigInt64Array`, `BigUint64Array` | `typedArrayTransform`     | will need `arrayBufferTransform`     |

## Notes

- Proxies will be flattened, without being flagged by the validator as these can only be detected in node, see example for custom validator to reject proxies in node.
- When writing custom transforms, to test for custom class instances, use `isInstanceOf` instead of `instanceof` to prevent capturing instances of subclasses.

## Example

```ts
import util from "node:util";
import {
	type Serializable,
	transforms,
	transform,
	classTransform,
	classGroupTransform,
	stringify,
	parse
} from "extended-serializer";

const options = {
	validate: value => !util.types.isProxy(value),
	transforms: [
		...transforms,
		customSymbol: makeTransform({
			test: (value) => value === customSymbol,
			decode: () => customSymbol,
		}),
		customFunction: makeTransform({
			test: (value) => value === customFunction,
			decode: () => customFunction,
		}),
		customClass: makeClassTransform({
			constructor: CustomClass,
			encode: ({ a, b }) => [a, b],
		}),
		customClassGroup: makeClassGroupTransform({
			key: "customClassGroup",
			classes: [IntVector, FloatVector, BooleanVector],
			encode: ({ x, y, z }) => [x, y, z],
		}),
	],
} satisfies SerializeOptions;

type Primitive = Serializable<typeof options>;

const value = {
  a: NaN,
  b: Infinity,
  c: new Set([1, 2, 3]),
  d: customSymbol,
  e: customFunction,
  f: new CustomClass(1, 2),
} satisfies Primitive;

const str = stringify(value, options);
const clone = parse(encoded, options);

//clone is now a deep clone of value

//or can use clone
const clone = clone(value, options);
```

## Alternative Work

### devalue

https://github.com/Rich-Harris/devalue

- Can't pick and choose transforms
- Doesn't fully validate serializable values
- Unflexible custom transforms

### oson

https://github.com/KnorpelSenf/oson?tab=readme-ov-file

- Only supports class instances custom transforms
- Doesn't support NaN, Infinity, -0
- Doesn't support well known symbols or symbols in global registry
- Doesn't fully validate serializable values

### superjson

https://github.com/flightcontrolhq/superjson

- Globally defined transforms
- Doesn't fully validate serializable values

### next-json

https://github.com/iccicci/next-json?tab=readme-ov-file

- Non JSON output
- Doesn't support ArrayBuffer or TypedArrays
- Doesn't support well known symbols or symbols in global registry
- Doesn't support Error instances
- Doesn't support complex objects

### arson

https://github.com/benjamn/arson

- Doesn't fully validate serializable values
- Doesn't fully restore serialized values (e.g RegExp missing lastIndex)

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

### tosource

https://github.com/marcello3d/node-tosource

- Non JSON output
- Not extendable
- Doesn't fully validate serializable values (by design, e.g. attempts to serialize functions with toString)

### serialize-javascript

https://github.com/yahoo/serialize-javascript

- Creates a JS script requiring dangerous eval

### Lave

https://github.com/jed/lave

- Creates a JS script requiring dangerous eval
- Archived

```

```
