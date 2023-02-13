import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const [setBornTo, setYear] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const authors = props.authors;
  let options = [];
  authors.map((author) =>
    options.push({ value: author.name, label: author.name })
  );

  const submit = async (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name: selectedOption.value, setBornTo } });
    setSelectedOption(null);
    setYear("");
  };

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={null}
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
          placeholder="Select Author..."
        />

        <div>
          Born
          <input
            required
            type="number"
            value={setBornTo}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;
