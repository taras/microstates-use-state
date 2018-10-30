import React from "react";
import ReactDOM from "react-dom";
import useType from './use-type';

import "./styles.css";

function App() {
  let c1 = useType(Number, 42);
  let c2 = useType(Number, 20);

  return <div>
    <button onClick={() => c1.increment() }>Increment ({c1.state})</button>
    <button onClick={() => c2.increment() }>Increment ({c2.state})</button>
  </div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
