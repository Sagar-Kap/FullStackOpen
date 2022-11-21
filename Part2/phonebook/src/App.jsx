import { useState } from "react";
import Find from "./components/Find";
import Persons from "./components/Persons";
import Form from "./components/Form";
import { useEffect } from "react";
import services from "./services/addPersons";

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
    services.getAll().then((info) => setPersons(info));
  }, []);

  const findName = (e) => {
    setQuery(e.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const newNoteObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((object) => object.name === newName)) {
      const id = persons.find((e) => e.name === newName).id;

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        services.updateValue(id, newNoteObject);
        const updatedArray = persons.map((mapPerson) => {
          if (mapPerson.id === id) {
            return newNoteObject;
          } else return mapPerson;
        });
        setPersons(updatedArray);
        setNewName("");
        setNewNumber("");
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      services.add(newNoteObject).then((returnValue) => {
        setPersons(persons.concat(returnValue));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const numberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const noteInputChange = (e) => {
    setNewName(e.target.value);
  };

  const deleteFunction = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      services.deleteValue(person.id);

      const editedArray = persons.filter((chovek) => chovek.id !== person.id);
      setPersons(editedArray);
    }
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
        <Persons
          persons={persons}
          query={query}
          deleteFunction={deleteFunction}
        />
      </ul>
    </div>
  );
};

export default App;
