import { arrayBufferTransform } from "./arrayBufferTransform";
import { bigIntTransform } from "./bigIntTransform";
import { complexArrayTransform } from "./complexArrayTransform";
import { complexObjectTransform } from "./complexObjectTransform";
import { dataViewTransform } from "./dataViewTransform";
import { dateTransform } from "./dateTransform";
import { errorClassTransform } from "./errorClassTransform";
import { infinityTransform } from "./infinityTransform";
import { mapTransform } from "./mapTransform";
import { nanTransform } from "./nanTransform";
import { negativeZeroTransform } from "./negativeZeroTransform";
import { primitiveClassTransform } from "./primitiveClassTransform";
import { regExpTransform } from "./regExpTransform";
import { registrySymbolTransform } from "./registrySymbolTransform";
// import { repeatedReferencesTransform } from "./repeatedReferencesTransform";
import { setTransform } from "./setTransform";
import { typedArrayTransform } from "./typedArrayTransform";
import { undefinedTransform } from "./undefinedTransform";
import { wellKnownSymbolTransform } from "./wellKnownSymbolTransform";

/**
 * An array containing all the built-in transforms.
 */
export const transforms = [
  negativeZeroTransform,
  nanTransform,
  infinityTransform,
  undefinedTransform,
  bigIntTransform,
  complexObjectTransform,
  complexArrayTransform,
  //   repeatedReferencesTransform,
  registrySymbolTransform,
  wellKnownSymbolTransform,
  setTransform,
  mapTransform,
  dateTransform,
  regExpTransform,
  arrayBufferTransform,
  dataViewTransform,
  primitiveClassTransform,
  errorClassTransform,
  typedArrayTransform,
];
