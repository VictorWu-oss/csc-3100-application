// src/Table.jsx
import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter}/>
    </table>
  );
}

export default Table;