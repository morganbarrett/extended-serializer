export type Shape = [string, string, Primitive];

export type Primitive<Extra = never> =
	| null
	| boolean
	| number
	| string
	| Extra
	| Primitive<Extra>[]
	| {[key: string]: Primitive<Extra>};

export type Definition<T = unknown, P extends Primitive = Primitive> = {
	is: (value: unknown) => value is T;
	encode: (value: T, fn: (value: unknown) => Primitive) => P;
	decode: (value: P) => T;
};
