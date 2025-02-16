import type { Primitive, ShapeLike } from "../types";

export const isShapeLike = (
  value: Primitive,
  tag: string
): value is ShapeLike =>
  Array.isArray(value) &&
  typeof value[0] === "string" &&
  value[0].startsWith(tag);
