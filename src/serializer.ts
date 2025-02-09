import {type Definition, type Primitive, type Shape} from "./types";
import {validate} from "./validate";

export const define = <T, P extends Primitive>(obj: Definition<T, P>) => obj;

export const serializer = <Allowed = never>(
	definitions: Record<string, Definition>,
	tag = "$"
) => {
	const regex = new RegExp(`^\\${tag}+$`);

	const replacer = (_: string, value: unknown): Allowed | Primitive => {
		for (const [key, obj] of Object.entries(definitions)) {
			if (obj.is(value)) {
				return [
					tag,
					key,
					obj.encode(value, v => replacer("", v) as Primitive)
				] satisfies Shape;
			}
		}

		validate(value);

		if (Array.isArray(value)) {
			const [first, ...rest] = value;

			if (typeof first === "string" && regex.test(first)) {
				return [`${tag}${first}`, ...rest];
			}
		}

		return value;
	};

	const reviver = (_: string, value: Allowed | Primitive): unknown => {
		if (Array.isArray(value)) {
			const [first, ...rest] = value;

			if (typeof first === "string" && regex.test(first)) {
				if (first === tag) {
					const [key, data] = rest as [string, Primitive];

					const obj = definitions[key];

					if (!obj) {
						throw new Error(`Unknown key ${key}`);
					}

					return obj.decode(data);
				}

				return [first.slice(1), ...rest];
			}
		}

		return value;
	};

	return {replacer, reviver};
};
