import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    addBook({
      variables: {
        title,
        author,
        genres,
        published: Number(published),
      },
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
      update: (store, response) => {
        genres.forEach((genre) => {
          try {
            const dataInStore = store.readQuery({
              query: ALL_BOOKS,
              variables: { genre },
            });

            store.writeQuery({
              query: ALL_BOOKS,
              variables: { genre },
              data: {
                allBooks: [...dataInStore.allBooks].concat(
                  response.data.addBook
                ),
              },
            });
          } catch (error) {
            console.log(`${genre} not queried`);
          }
        });
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <h2>Add new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
