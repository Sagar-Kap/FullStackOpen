import { useSelector, useDispatch } from "react-redux";
import { toggleLikes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(toggleLikes(id));
    console.log("vote", id);
  };

  const sortedArray = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedArray.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
