import { makeClassGroupTransform } from "../makeTransform";

export const errorClassTransform = makeClassGroupTransform({
  key: "errorClass",
  classes: {
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    AggregateError,
  },
  encode: (error, recur) =>
    [
      error.message,
      error.cause,
      Object.hasOwn(error, "name") ? error.name : null,
    ].map(recur),
  decode: (constructor, [message, cause, name]) => {
    const error = new constructor(message, { cause });

    if (name !== null) {
      error.name = name;
    }

    return error;
  },
});
