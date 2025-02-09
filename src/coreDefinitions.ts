import {define} from "./serializer";
import {type Primitive} from "./types";

export type CorePrimitive<Extra = never> = Primitive<
	| undefined
	| bigint
	| Set<CorePrimitive<Extra>>
	| Map<CorePrimitive<Extra>, CorePrimitive<Extra>>
	| Date
	| Extra
>;

export const coreDefinitions = {
	undefined: define({
		is: value => value === undefined,
		encode: () => null,
		decode: () => undefined
	}),
	nan: define({
		is: (value): value is number => Number.isNaN(value),
		encode: () => null,
		decode: () => NaN
	}),
	infinity: define({
		is: (value): value is number =>
			typeof value === "number" && !Number.isFinite(value),
		encode: Math.sign,
		decode: value => value * Infinity
	}),
	bigint: define({
		is: value => typeof value === "bigint",
		encode: value => value.toString(),
		decode: value => BigInt(value)
	}),
	set: define({
		is: value => value instanceof Set,
		encode: (value, fn) => [...value.values()].map(fn),
		decode: value => new Set(value)
	}),
	map: define({
		is: value => value instanceof Map,
		encode: (value, fn) =>
			[...value.entries()].map(([a, b]) => [fn(a), fn(b)] as const),
		decode: value => new Map(value)
	}),
	date: define({
		is: value => value instanceof Date,
		encode: value => value.getTime(),
		decode: value => new Date(value)
	})
};
