// src/MyApp.jsx
import React from "react";
import Table from "./Table";
import {useState} from "react";
import Form from "./Form";
import React, { useState, useEffect } from "react";

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

// ONLY WHEN MYAPP STARTS TO BUILD INITIAL TABLE
// Makes GET request through our API on backend.
// Returns data (list of users from the backend) used to populate the table of chars on the frontend
// src/MyApp.js (a new inner function inside MyApp())
// Fetch function makes req to URl which is given as a param. Returns promise instead of waiting. 
// Promise is fulfilled when res is received back from the server
function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  // Promise useful when needed to perform an operation which will either take some time or never finish
  // Dont want code to wait for data to come back to server, it will seem unresponsive
  return promise; 
}

// Make MyApp component call fetchUser function the 1st time a component is rendered to start the process of req data.
// Use React Hook called Effect. Syncs React comp with external systems or actions outside of React
// Using .then() when the promise is returned and fulfilled (data available) we want to set compoennt state using setChars
useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);