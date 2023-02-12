import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <Router>
      <div>
        <div>
          <Link to="/authors">
            <button onClick={() => setPage("authors")}>authors</button>
          </Link>
          <Link to="books">
            <button onClick={() => setPage("books")}>books</button>
          </Link>
          <Link to="add">
            <button onClick={() => setPage("add")}>add book</button>
          </Link>
        </div>

        <Routes>
          <Route
            path="authors"
            element={<Authors show={page === "authors"} />}
          />

          <Route path="books" element={<Books show={page === "books"} />} />

          <Route path="add" element={<NewBook show={page === "add"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
