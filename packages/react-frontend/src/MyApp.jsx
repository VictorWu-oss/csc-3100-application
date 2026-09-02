// src/MyApp.jsx
import React from "react";
import Table from "./Table";
import {useState} from "react";
import Form from "./Form";

function MyApp() {

  // characters is the current state value
  // setCharacters is the function that lets you update it
  // useState call returns the aforementioned pairs
  // remove hard-coded characters list and now appending to an empty list
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index){
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person){
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter}/>
      <Form handleSubmit={updateList}  />
    </div>
  );
}

export default MyApp;