import { describe, expect, it } from "vitest";
import { type Definition, Serializer, coreDefinitions } from "../src";

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
  "lone tag array": ["$"],
  "tag array": ["$", 1, 2],
  "escaped tag array": ["$$", "a"],
  "double escaped tag array": ["$$$", "$$", "$"],
  object: { a: 1, b: 2, c: 3 },
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
};

const baseSerializer = new Serializer({});
const coreSerializer = new Serializer(coreDefinitions);

const runValid = <Definitions extends Record<string, Definition<any, any>>>(
  serializer: Serializer<Definitions>,
  tests: Record<string, any>
) => {
  for (const [name, value] of Object.entries(tests)) {
    it(name, () => {
      const str = serializer.stringify(value);
      const parsed = serializer.parse(str);

      expect(parsed).toEqual(value);
    });
  }
};

const runInvalid = <Definitions extends Record<string, Definition<any, any>>>(
  serializer: Serializer<Definitions>,
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
