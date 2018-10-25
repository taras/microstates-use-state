import React from "react";
export const StateSymbol = Symbol("@@state");

export function useState(value) {
  if (value && value[StateSymbol]) {
    let [state, set] = React.useState(value);
    return state === value ? value[StateSymbol](set) : state;
  } else {
    return React.useState(value);
  }
}
