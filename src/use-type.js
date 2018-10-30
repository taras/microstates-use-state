import { create, Store } from 'microstates';
import { useMemo, useState } from 'react'

export default function useType(Type, value) {
  let state;

  let reference = useMemo(() => {
    let o = create(Type, value);
    let first = true;

    return Store(o, next => {
      if (first) {
        first = false;
      } else {
        state[1](next);
      }
    })
  }, [Type, value]);

  state = useState(reference);

  return state[0];
}