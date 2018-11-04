import ReactDOM from "react-dom";
import React, { useMemo, useState, useEffect } from "react";
import { create, Store, valueOf } from "microstates";

import "./styles.css";

let initial = JSON.parse(localStorage.getItem("family-tree") || "{}");

function useType(Type, value) {
  let state;

  let initialState = useMemo(
    () => Store(create(Type, value), next => state[1](next)),
    [Type, value]
  );

  state = useState(initialState);

  return state[0];
}

class Person {
  name = String;
  father = Person;
  mother = Person;
}

function FamilyTree({ person }) {
  let name = useMemo(
    () => {
      console.log('Updating name to', person.name.state);
      return (
        <input
          value={person.name.state}
          onChange={e => person.name.set(e.target.value)}
        />
      );
    },
    [person.name]
  );

  let father = useMemo(() => <FamilyTree person={person.father} />, [
    person.father
  ]);

  let mother = useMemo(() => <FamilyTree person={person.mother} />, [
    person.mother
  ]);

  return (
    <>
      {name}
      {person.name.state && (
        <ul>
          <li>Father: {father}</li>
          <li>Mother: {mother}</li>
        </ul>
      )}
    </>
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
