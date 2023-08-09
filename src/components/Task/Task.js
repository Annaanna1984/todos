import React, { useContext, useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import KG from "date-fns/locale/en-AU";
import PropTypes from "prop-types";
import { Context } from "../TodoApp";
import Timer from "../Timer/Timer";

const Task = (props) => {
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const { deleteItem, onToggleDone, editItem } = useContext(Context);
  const { id, label, done, date, time } = props.todo;

  const handleSubmit = (event) => {
    event.preventDefault();
    editItem(id, value);

    setValue("");
    setEditing(false);
  };

  useEffect(() => {
    const handleEscPress = (event) => {
      if (event.key === "Escape" && editing) {
        event.preventDefault();
        setEditing(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        editing
      ) {
        setEditing(false);
      }
    };

    document.addEventListener("keydown", handleEscPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing]);

  return (
    <li key={id} className={done ? "completed" : editing ? "editing" : null}>
      <div className={"view"}>
        <input
          id={`${id}`}
          className="toggle"
          type="checkbox"
          onClick={() => onToggleDone(id)}
          readOnly
        ></input>
        <label htmlFor={`${id}`}>
          <span className="title ">{label}</span>
          <Timer id={id} time={time} />
          <span className="description">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            setEditing(!editing);
            setValue(label);
          }}
        ></button>
        <button
          className="icon icon-destroy"
          onClick={() => deleteItem(id)}
        ></button>
      </div>
      {editing && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(event) => setValue(event.target.value)}
            type="text"
            className="edit"
            value={value}
            ref={inputRef}
          />
        </form>
      )}
    </li>
  );
};

export default Task;

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    time: PropTypes.number,
    done: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
};

Task.defaultProps = {
  todo: {},
};
