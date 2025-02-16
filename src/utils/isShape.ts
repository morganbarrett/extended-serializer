import type { Primitive, Shape } from "../types";
import { isShapeLike } from "./isShapeLike";

export const isShape = (value: Primitive, tag: string): value is Shape =>
  isShapeLike(value, tag) && value[0] === tag;
