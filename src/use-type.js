import { create, Store } from "microstates";
import { useMemo, useState } from "react";

export default function useType(Type, value) {
  let state;

  let reference = useMemo(
    () => {
      let s = create(Type, value);
      let i = Store(s, next => state[1](next))
      return i;
    },
    [Type, value]
  );

  state = useState(reference);

  return state[0];
}
