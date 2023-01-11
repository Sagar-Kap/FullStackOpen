import { createStore } from "redux";
import reducer from "./reducer";

const App = () => {
  const store = createStore(reducer);
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button>ok</button>
      <button>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok</div>
      <div>bad</div>
    </div>
  );
};

export default App;
