import { useState } from "react";
import Find from "./components/Find";
import Persons from "./components/Persons";
import Form from "./components/Form";
import Notification from "./components/Notification";
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
  const [notification, setNotification] = useState(null);
  const [type, setType] = useState("notification");

  useEffect(() => {
    services.getAll().then((info) => setPersons(info));
  }, []);

  const findName = (e) => {
    setQuery(e.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newNoteObject = {
      name: newName,
      number: newNumber,
    };

    if (
      persons.some(
        (object) => object.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const id = persons.find(
        (e) => e.name.toLowerCase() === newName.toLocaleLowerCase()
      ).id;
      console.log(id);

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        services
          .updateValue(id, newNoteObject)
          .then(() => {
            const updatedArray = persons.map((mapPerson) => {
              if (mapPerson.id === id) {
                return {
                  name: newNoteObject.name,
                  number: newNoteObject.number,
                  id: id,
                };
              } else {
                return mapPerson;
              }
            });
            setNewName("");
            setNewNumber("");
            setPersons(updatedArray);
            setNotification(`Added ${newName}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNewName("");
            setNewNumber("");
            setType("error");
            setNotification(error.response.data.error);
            setTimeout(() => {
              setNotification(null);
              setType("notification");
            }, 5000);
          });
      } else {
        setNewNumber("");
      }
    } else {
      services
        .add(newNoteObject)
        .then((returnValue) => {
          setPersons(persons.concat(returnValue));
          setNewName("");
          setNewNumber("");
        })
        .then(() => {
          setNotification(`Added ${newName}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(error.response.data.error);
          setType("error");
          setNewNumber("");
          setTimeout(() => {
            setNotification(null);
            setNewNumber("");
            setType("notification");
          }, 5000);
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
      setQuery("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={type} />

      <Find findName={findName} query={query} />

      <h2>Add a new</h2>

      <Form
        newName={newName}
        noteInputChange={noteInputChange}
        newNumber={newNumber}
        numberChange={numberChange}
        addPerson={addPerson}
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
