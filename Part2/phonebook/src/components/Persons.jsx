const Persons = ({ persons, query, deleteFunction }) => {
  const allArray = persons.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deleteFunction(person)}>Delete</button>
    </li>
  ));

  const findArray = persons
    .filter((person) =>
      person.name.toLowerCase().startsWith(query.toLowerCase())
    )
    .map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deleteFunction(person)}>Delete</button>
      </li>
    ));

  return query ? findArray : allArray;
};

export default Persons;
