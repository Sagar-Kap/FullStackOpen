import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";

const ALL_PERSONS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
    allBooks {
      title
      author
      published
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_PERSONS);

  if (result.loading) return <p>Loading...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;

  return (
    <Router>
      <div>
        <div>
          <Link to="/authors">
            <button onClick={() => setPage("authors")}>authors</button>
          </Link>
          <Link to="/books">
            <button onClick={() => setPage("books")}>books</button>
          </Link>
          <Link to="/add">
            <button onClick={() => setPage("add")}>add book</button>
          </Link>
        </div>

        <Routes>
          <Route
            path="authors"
            element={
              <Authors
                show={page === "authors"}
                authors={result.data.allAuthors}
              />
            }
          />

          <Route
            path="books"
            element={
              <Books show={page === "books"} books={result.data.allBooks} />
            }
          />

          <Route path="add" element={<NewBook show={page === "add"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
