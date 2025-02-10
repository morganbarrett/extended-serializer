import { type ExtractType, type Transform } from "./transforms";
import { type Primitive, validate } from "./validate";

type Shape = [string, string, Primitive];
type ShapeLike = [string, ...Primitive[]];

export class Serializer<
  Transforms extends Record<string, Transform<any, any>>,
> {
  private regex: RegExp;

  constructor(
    private transforms: Transforms,
    private tag = "$"
  ) {
    this.regex = new RegExp(`^\\${tag}+$`);
  }

  stringify(value: ExtractType<Transforms>): string {
    return JSON.stringify(this.replacer(value));
  }

  parse(value: string): ExtractType<Transforms> {
    return this.reviver(JSON.parse(value));
  }

  private replacer(value: ExtractType<Transforms>): Primitive {
    for (const [key, obj] of Object.entries(this.transforms)) {
      if (obj.test(value)) {
        return this.serializeCustom(key, obj.serialize(value));
      }
    }

    validate(value);

    if (this.isShapeLike(value)) {
      return this.escapeShape(value);
    }

    return this.recur(value, "replacer") as Primitive;
  }

  private reviver(value: Primitive): ExtractType<Transforms> {
    if (this.isShape(value)) {
      return this.deserializeCustom(value);
    }

    if (this.isShapeLike(value)) {
      return this.unescapeShape(value);
    }

    return this.recur(value, "reviver");
  }

  private isShape(value: Primitive): value is Shape {
    return this.isShapeLike(value) && value[0] === this.tag;
  }

  private isShapeLike(value: Primitive): value is ShapeLike {
    return (
      Array.isArray(value) &&
      typeof value[0] === "string" &&
      this.regex.test(value[0])
    );
  }

  private serializeCustom(key: string, value: ExtractType<Transforms>): Shape {
    return [this.tag, key, this.replacer(value)];
  }

  private deserializeCustom([_, key, data]: Shape): ExtractType<Transforms> {
    const obj = this.transforms[key];

    if (!obj) {
      throw new Error(`Unknown transform ${key}`);
    }

    return obj.deserialize(this.reviver(data));
  }

  private escapeShape([first, ...rest]: ShapeLike): ShapeLike {
    return [
      `${this.tag}${first}`,
      ...rest.map((value) => this.replacer(value)),
    ];
  }

  private unescapeShape([first, ...rest]: ShapeLike): ExtractType<Transforms> {
    return [first.slice(1), ...rest.map((value) => this.reviver(value))];
  }

  private recur(value: Primitive, fnKey: "replacer" | "reviver") {
    const fn = this[fnKey].bind(this);

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.map(fn);
      }

      return Object.fromEntries(
        Object.entries(value).map(([key, value]) => [key, fn(value)])
      );
    }

    return value;
  }
}
