const Form = (props) => {
  return (
    <form>
      <div>
        name: <input value={props.newName} onChange={props.noteInputChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.numberChange} />
      </div>
      <div>
        <button onClick={props.addNote} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
