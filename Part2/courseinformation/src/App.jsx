const Course = ({ course }) => {
  return (
    <div>
      {
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
        </div>
      }
    </div>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
  const list = parts.map((part) => (
    <Part
      key={part.id}
      name={part.name}
      exercises={part.exercises}
      id={part.id}
    />
  ));

  return list;
};

const Part = (props) => {
  return (
    <div>
      {props.name} {props.exercises}
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
