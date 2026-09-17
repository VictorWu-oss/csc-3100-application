// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"] ?? []))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function receives the row index, so get the complete char and its ID
  function removeOneCharacter(index) {
    const character = characters[index];

    fetch(`http://localhost:8000/users/${character.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Change updateList, only update if POST call is successful (If promise returned by postUser throw any error)
  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status !== 201) {
          return;
        }

        return response.json();
      })
      .then((newUser) => {
        if (newUser) {
          setCharacters([...characters, newUser]);
        }
      });
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;