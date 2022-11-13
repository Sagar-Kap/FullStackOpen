const Persons = ({ persons, query }) => {
  const allArray = persons.map((person) => (
    <li key={person.id}>
      {person.name} {person.number}
    </li>
  ));

  const findArray = persons
    .filter((person) =>
      person.name.toLowerCase().startsWith(query.toLowerCase())
    )
    .map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ));

  return query ? findArray : allArray;
};

export default Persons;
