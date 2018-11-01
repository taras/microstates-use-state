import ReactDOM from "react-dom";
import React, { useMemo, useState, useEffect } from "react";
import { create, Store, valueOf } from "microstates";

import "./styles.css";

let initial = JSON.parse(localStorage.getItem("family-tree") || "{}");

function useType(Type, value) {
  let state;

  let reference = useMemo(() => Store(create(Type, value), next => state[1](next)),
    [Type, value]
  );

  state = useState(reference);

  return state[0];
}

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
  return useMemo(
    () => (
      <>
        <input
          value={person.name.state}
          onChange={e => person.name.set(e.target.value)}
        />
        {person.name.state !== "" && (
          <ul>
            <li>
              Father: <FamilyTree person={person.father} />
            </li>
            <li>
              Mother: <FamilyTree person={person.mother} />
            </li>
          </ul>
        )}
      </>
    ),
    [person]
  );
}

function App({ initial }) {
  let person = useType(Person, initial);

  useEffect(() => {
    let value = valueOf(person);
    localStorage.setItem("family-tree", JSON.stringify(value));
  });

  return (
    <>
      <h2>Family Tree</h2>
      <label>Name </label>
      <FamilyTree person={person} />
    </>
  );
}

ReactDOM.render(<App initial={initial} />, document.getElementById("root"));
