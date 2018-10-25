import React from "react";
import ReactDOM from "react-dom";
import { useState } from "./future-react";
import { create } from "./future-microstates";

import "./styles.css";

let initial = create(Number, 42);

function App() {
  let counter = useState(initial);
  return <button onClick={() => counter.increment() }>Increment ({counter.state})</button>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
