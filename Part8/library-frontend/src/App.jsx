import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";

import { ALL_AUTHORS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) return <p>Loading...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;

  return (
    <Router>
      <div>
        <div>
          <Link to="/authors">
            <button onClick={() => setPage("authors")}>Authors</button>
          </Link>
          <Link to="/books">
            <button onClick={() => setPage("books")}>Books</button>
          </Link>
          <Link to="/add">
            <button onClick={() => setPage("add")}>Add Book</button>
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
