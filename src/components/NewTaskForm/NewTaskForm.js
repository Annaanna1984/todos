import React, { useState } from "react";
import PropTypes from "prop-types";

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const time = parseInt(sec ? sec : "0") + parseInt(min ? min : "0") * 60;

    addItem(label, time);

    setLabel("");
    setMin("");
    setSec("");
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={(e) => onSubmit(e)} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          required={true}
          onChange={(e) => setLabel(e.target.value)}
          value={label}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          min="0"
          max="59"
          onChange={(e) => setMin(e.target.value)}
          value={min}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          min="0"
          max="59"
          onChange={(e) => setSec(e.target.value)}
          value={sec}
        ></input>
        <input type="submit" style={{ display: "none" }} />
      </form>
    </header>
  );
};

export default NewTaskForm;

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};
