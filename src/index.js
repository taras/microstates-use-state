import React from "react";
import ReactDOM from "react-dom";
import useType from "./use-type";
import { valueOf } from "microstates";

import "./styles.css";

class Person {
  initialize() {
    if (valueOf(this) === undefined) {
      return this.set({});
    } else {
      return this;
    }
  }
  name = String;
  father = Person;
  mother = Person;
}

function FamilyTree({ person }) {
  return (
    <ul>
      <li>
        <input
          value={person.name.state}
          onChange={e => {
            person.name.set(e.target.value);
          }}
        />
        {person.name.state !== "" && (
          <div>
            <strong>Father</strong>
            <FamilyTree person={person.father} />
            <strong>Mother</strong>
            <FamilyTree person={person.mother} />
          </div>
        )}
      </li>
    </ul>
  );
}

function App() {
  let person = useType(Person);
  return <FamilyTree person={person} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
