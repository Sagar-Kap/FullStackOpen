import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const newNoteObject = { name: newName, id: persons.length + 1 };
    setPersons(persons.concat(newNoteObject));
    setNewName("");
    console.log(newName);
  };

  const noteInputChange = (e) => {
    setNewName(e.target.value);
  };

  const NewEntry = ({ persons }) => {
    const entryArray = persons.map((person) => (
      <li key={person.id}>{person.name}</li>
    ));
    return entryArray;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={noteInputChange} />
        </div>
        <div>
          <button onClick={addNote} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <NewEntry persons={persons} />
      </ul>
    </div>
  );
};

export default App;
