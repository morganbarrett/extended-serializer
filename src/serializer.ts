import { type Definition, type ExtractType, type Primitive } from "./types";
import { validate } from "./validate";

type Shape = [string, string, Primitive];

export const define = <T, P extends Primitive>(obj: Definition<T, P>) => obj;

export class Serializer<
  Definitions extends Record<string, Definition<any, any>>,
> {
  private regex: RegExp;

  constructor(
    private definitions: Definitions,
    private tag = "$"
  ) {
    this.regex = new RegExp(`^\\${tag}+$`);
  }

  stringify(value: ExtractType<Definitions>) {
    return JSON.stringify(this.recur(value));
  }

  parse(value: string) {
    return JSON.parse(value, (_, value) => this.reviver(value));
  }

  private recur(rawValue: ExtractType<Definitions>): ExtractType<Definitions> {
    const value = this.replacer(rawValue);

    if (typeof value === "object") {
      if (value === null) {
        return null;
      }

      if (Array.isArray(value)) {
        return value.map((value) => this.recur(value));
      }

      return Object.fromEntries(
        Object.entries(value).map(([key, value]) => [key, this.recur(value)])
      );
    }

    return value;
  }

  private replacer(value: ExtractType<Definitions>): Primitive {
    for (const [key, obj] of Object.entries(this.definitions)) {
      if (obj.is(value)) {
        return [
          this.tag,
          key,
          obj.encode(value, (v) =>
            this.replacer(v as ExtractType<Definitions>)
          ),
        ] satisfies Shape;
      }
    }

    validate(value);

    if (Array.isArray(value)) {
      const [first, ...rest] = value;

      if (typeof first === "string" && this.regex.test(first)) {
        return [`${this.tag}${first}`, ...rest];
      }
    }

    return value;
  }

  private reviver(value: Primitive): ExtractType<Definitions> {
    if (Array.isArray(value)) {
      const [first, ...rest] = value;

      if (typeof first === "string" && this.regex.test(first)) {
        if (first === this.tag) {
          const [_, key, data] = value as Shape;

          const obj = this.definitions[key];

          if (!obj) {
            throw new Error(`Unknown key ${key}`);
          }

          return obj.decode(data);
        }

        return [first.slice(1), ...rest];
      }
    }

    return value;
  }
}
