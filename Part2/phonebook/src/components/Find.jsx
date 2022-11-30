const Find = ({ findName, query }) => {
  return (
    <div>
      Filter shown with <input value={query} onChange={findName} />
    </div>
  );
};

export default Find;
