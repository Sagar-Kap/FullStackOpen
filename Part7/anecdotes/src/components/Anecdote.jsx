import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((n) => n.id === Number(id));
  return (
    <div>
      <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
      <p>{`Has ${anecdote.votes} votes`}</p>
      <p>{`For more info see ${anecdote.info}`}</p>
    </div>
  );
};

export default Anecdote;
