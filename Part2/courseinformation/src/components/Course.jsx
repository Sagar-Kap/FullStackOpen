const Header = ({ name }) => <h2>{name}</h2>;

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
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Sum = ({ array }) => {
  const total = array.reduce((previous, current) => {
    return previous + current.exercises;
  }, 0);

  return <p className="sum">total of {total} exercises</p>;
};

const Course = ({ courses }) => {
  const courseList = courses.map((course) => {
    return (
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Sum array={course.parts} />
      </div>
    );
  });

  return courseList;
};

export default Course;
