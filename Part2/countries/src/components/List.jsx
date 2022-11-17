import SingleCountry from "./SingleCountry";

const List = ({ toShow, setToShow }) => {
  if (toShow.length <= 10 && toShow.length !== 0 && toShow.length !== 1) {
    return (
      <ul>
        {toShow.map((cont) => {
          return (
            <li key={cont.name.common}>
              {cont.name.common}{" "}
              <button onClick={() => setToShow([cont])}>show</button>
            </li>
          );
        })}
      </ul>
    );
  } else if (toShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (toShow.length === 1) {
    return <SingleCountry country={toShow[0]} />;
  }
};

export default List;
