import { useDispatch } from "react-redux";
import { addNew } from "./reducers/anecdoteReducer";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const dispatch = useDispatch();
  const addNewAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(addNew(content));
  };

  return (
    <div>
      <AnecdoteList />
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
