import axios from "axios";
import { useState, useEffect } from "react";
import List from "./components/List";

function App() {
  const [data, setData] = useState([]);
  const [findValue, setFindValue] = useState("");
  const [toShow, setToShow] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setData(response.data);
    });
  }, []);

  const onFind = (e) => {
    const value = e.target.value;
    setFindValue(value);

    if (value.length !== 0) {
      const array = data.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      );
      setToShow(array);
    } else {
      setToShow([]);
    }
  };

  return (
    <div className="App">
      <div>
        Find countries <input value={findValue} onChange={onFind} />
      </div>
      <List toShow={toShow} setToShow={setToShow} />
    </div>
  );
}

export default App;
