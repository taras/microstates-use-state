import { create, Store } from "microstates";
import { useMemo, useState } from "react";

export default function useType(Type, value) {
  let state;

  let reference = useMemo(
    () => Store(create(Type, value), next => state[1](next)),
    [Type, value]
  );

  state = useState(reference);

  return state[0];
}
