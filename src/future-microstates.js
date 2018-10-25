import { create as createMicrostate, Store } from "microstates";
import { StateSymbol } from "./future-react";

export function create(Type, value) {
  let microstate = createMicrostate(Type, value);

  return Object.defineProperty(microstate, StateSymbol, {
    configurable: false,
    enumerable: false,
    value(set) {
      let first = true;
      return Store(this, next => {
        if (first) {
          first = false;
          return;
        } else {
          set(next);
        }
      });
    }
  });
}
