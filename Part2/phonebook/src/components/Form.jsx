const Form = (props) => {
  return (
    <form>
      <div>
        Name: <input value={props.newName} onChange={props.noteInputChange} />
      </div>
      <div>
        Number: <input value={props.newNumber} onChange={props.numberChange} />
      </div>
      <div>
        <button onClick={props.addPerson} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
