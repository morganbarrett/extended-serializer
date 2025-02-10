import { describe, expect, it } from "vitest";
import { Serializer, type Transform, transforms } from "../src";

const allValid = {
  null: null,
  true: true,
  false: false,
  integer: 42,
  decimal: 3.14,
  "negative integer": -99,
  "empty string": "",
  string: "hello world",
  "tag string": "$",
  "empty array": [],
  array: [1, 2, 3],
  "tagged array": ["$", 1, 2],
  "lone tagged array": ["$"],
  "escaped tagged array": ["$$", "a"],
  "double escaped tagged array": ["$$$", "$$", "$"],
  object: { a: 1, b: 2, c: 3 },
  complex: {
    a: [1, "a"],
    b: {
      c: ["$", "a"],
    },
    d: null,
  },
};

const allInvalid = {
  function: () => {},
  symbol: Symbol("a"),
  "symbol key": { [Symbol("a")]: 1 },
  getter: {
    get x() {
      return 3;
    },
  },
  setter: {
    set x(value: number) {},
  },
  Error: new Error("error"),
  ArrayBuffer: new ArrayBuffer(1),
};

const coreValid = {
  undefined: undefined,
  NaN: NaN,
  infinity: Infinity,
  "negative infinity": -Infinity,
  bigint: 5n,
  Date: new Date(),
  Set: new Set([1, 2, 3]),
  Map: new Map([["a", 1]]),
  "nested Set": new Set([new Set([1, 2, 3])]),
  "nested tag": new Set([["$", "set", [1, 2, 3]]]),
  complex: {
    a: [1, "a"],
    b: {
      c: ["$", "a"],
    },
    d: null,
    e: new Date(),
    f: new Set([
      1,
      2,
      new Set(["a", "b"]),
      {
        g: new Map<string, any>([
          ["a", 5n],
          ["b", NaN],
          ["c", new Date()],
        ]),
      },
    ]),
  },
};

const baseSerializer = new Serializer({});
const coreSerializer = new Serializer(transforms);

const runValid = <Transforms extends Record<string, Transform<any, any>>>(
  serializer: Serializer<Transforms>,
  tests: Record<string, any>
) => {
  for (const [name, value] of Object.entries(tests)) {
    it(name, () => {
      const str = serializer.stringify(value);
      const parsed = serializer.parse(str);
      console.log(str, parsed);

      expect(parsed).toEqual(value);
    });
  }
};

const runInvalid = <Transforms extends Record<string, Transform<any, any>>>(
  serializer: Serializer<Transforms>,
  tests: Record<string, any>
) => {
  for (const [name, value] of Object.entries(tests)) {
    it(name, () => {
      expect(() => serializer.stringify(value)).toThrow();
    });
  }
};

describe("Base serializer valid", () => {
  runValid(baseSerializer, allValid);
});

describe("Base serializer invalid", () => {
  runInvalid(baseSerializer, { ...allInvalid, ...coreValid });
});

describe("Core serializer valid", () => {
  runValid(coreSerializer, { ...allValid, ...coreValid });
});

describe("Core serializer invalid", () => {
  runInvalid(coreSerializer, allInvalid);
});
