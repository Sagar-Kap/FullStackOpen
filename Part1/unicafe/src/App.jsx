import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.text}</th>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const roundOff = (num) => Math.round(num * 10) / 10;
  const average = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad);
  const positivePerCent = (good / (good + bad + neutral)) * 100;
  const sum = good + neutral + bad;

  if (good !== 0 || bad !== 0 || neutral !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={roundOff(average)} />
          <StatisticLine
            text="positive"
            value={roundOff(positivePerCent) + " %"}
          />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
