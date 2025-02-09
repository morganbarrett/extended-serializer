import {type Primitive} from "./types";

//can't detect proxies, should be obvious proxies can't be serialized
export function validate(value: unknown): asserts value is Primitive {
	switch (typeof value) {
		case "boolean":
		case "string":
			return;
		case "number": {
			//NaN and Infinity are not allowed
			if (!Number.isFinite(value)) {
				throw new Error("Non finite numbers are not serializable");
			}

			return;
		}
		case "undefined":
			throw new Error("undefined is not serializable");
		case "symbol":
			throw new Error("Symbols are not serializable");
		case "function":
			throw new Error("Functions are not serializable");
		case "bigint":
			throw new Error("Bigints are not serializable");
		case "object": {
			//null allowed
			if (value === null) {
				return;
			}

			if (Array.isArray(value)) {
				//must be a pure array
				if (Object.getPrototypeOf(value) !== Array.prototype) {
					throw new Error("Non pure arrays are not serializable");
				}

				//no extra properties on arrays
				if (
					Object.keys(value).some(key => Number.isNaN(Number(key)))
				) {
					throw new Error(
						"Properties on array are not serializable"
					);
				}

				return;
			}

			//must be a pure object
			if (Object.getPrototypeOf(value) !== Object.prototype) {
				throw new Error("Class instances are not serializable");
			}

			for (const [key, descriptor] of Object.entries(
				Object.getOwnPropertyDescriptors(value)
			)) {
				//no symbol keys
				if (typeof key === "symbol") {
					throw new Error("Symbol keys are not serializable");
				}

				//only enumerable keys allowed
				if (!descriptor.enumerable) {
					throw new Error(
						"Non enumerable keys are not serializable"
					);
				}

				//no getters or setters
				if (descriptor.get || descriptor.set) {
					throw new Error(
						"Getters and setters are not serializable"
					);
				}
			}
		}
	}
}
