import { useState } from "react";
import Find from "./components/Find";
import Persons from "./components/Persons";
import Form from "./components/Form";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    { name: "Chirkut", number: "100911", id: 5 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const findName = (e) => {
    setQuery(e.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    if (persons.some((object) => object.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const newNoteObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newNoteObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const numberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const noteInputChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Find findName={findName} />

      <h2>add a new</h2>

      <Form
        newName={newName}
        noteInputChange={noteInputChange}
        newNumber={newNumber}
        numberChange={numberChange}
        addNote={addNote}
      />

      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} query={query} />
      </ul>
    </div>
  );
};

export default App;
