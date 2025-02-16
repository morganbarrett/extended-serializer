import { makeClassTransform } from "../makeTransform";

export const arrayBufferTransform = makeClassTransform({
  constructor: ArrayBuffer,
  encode: (buffer) => {
    const view = new DataView(buffer);
    const values: number[] = [];

    for (let i = 0; i < buffer.byteLength; i++) {
      values.push(view.getUint8(i));
    }

    return [buffer.byteLength, buffer.maxByteLength, values] as const;
  },
  decode: ([byteLength, maxByteLength, values]) => {
    const buffer = new ArrayBuffer(byteLength, { maxByteLength });
    const view = new DataView(buffer);

    values.forEach((value, index) => view.setUint8(index, value));

    return buffer;
  },
});
