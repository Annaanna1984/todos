import React, { useContext, useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import KG from "date-fns/locale/en-AU";
import PropTypes from "prop-types";
import { Context } from "../TodoApp";

const Task = (props) => {
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const { onDeleted, onToggleDone, editItem, tickTimer, stopTimer } =
    useContext(Context);
  const { id, label, done, date } = props.todo;
  const { timerId, minValue, secValue } = props;

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
          <span className="description">
            <button
              className="icon icon-play"
              onClick={() => {
                if (done || timerId) return;
                tickTimer(id);
              }}
            ></button>
            <button
              className="icon icon-pause"
              onClick={() => {
                if (!done) {
                  stopTimer(id, timerId);
                }
              }}
            ></button>
            <span className="new-todo-form__timer">{`${minValue}:${secValue}`}</span>
          </span>
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
        <button className="icon icon-destroy" onClick={onDeleted}></button>
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

// export default class Task extends React.Component {
//   state = {
//     editing: false,
//     value: "",
//   };
//   inputRef = React.createRef();
//
//   handleSubmit(event) {
//     event.preventDefault();
//     const {
//       editItem,
//       todo: { id },
//     } = this.props;
//     editItem(id, this.state.value);
//     this.setState({ value: "" });
//     this.setState({ editing: false });
//   }
//
//   handleEscPress = (event) => {
//     if (event.key === "Escape" && this.state.editing) {
//       event.preventDefault();
//       this.setState(() => ({ editing: false }));
//     }
//   };
//
//   handleClickOutside = (event) => {
//     if (
//       this.inputRef.current &&
//       !this.inputRef.current.contains(event.target) &&
//       this.state.editing
//     ) {
//       this.setState(() => ({ editing: false }));
//     }
//   };
//
//   componentDidMount() {
//     document.addEventListener("keydown", this.handleEscPress);
//     document.addEventListener("mousedown", this.handleClickOutside);
//   }
//
//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.handleEscPress);
//     document.removeEventListener("mousedown", this.handleClickOutside);
//   }
//
//   render() {
//     const { id, label, done, date } = this.props.todo;
//     const { onDeleted, onToggleDone } = this.props;
//     return (
//       <li
//         key={id}
//         className={done ? "completed" : this.state.editing ? "editing" : null}
//       >
//         <div className={"view"}>
//           <input
//             id={`${id}`}
//             className="toggle"
//             type="checkbox"
//             onClick={onToggleDone}
//             readOnly
//           ></input>
//           <label htmlFor={`${id}`}>
//             <span className="title ">{label}</span>
//             <span className="description">
//               <button
//                 className="icon icon-play"
//                 onClick={() => {
//                   if (this.props.todo.done || this.props.timerId) return;
//                   this.props.tickTimer(id);
//                 }}
//               ></button>
//               <button
//                 className="icon icon-pause"
//                 onClick={() => {
//                   if (!this.props.todo.done) {
//                     this.props.stopTimer(id, this.props.timerId);
//                   }
//                 }}
//               ></button>
//               <span className="new-todo-form__timer">{`${this.props.minValue}:${this.props.secValue}`}</span>
//             </span>
//             <span className="description">
//               {`created ${formatDistanceToNow(date, {
//                 includeSeconds: true,
//                 locale: KG,
//                 addSuffix: true,
//               })}`}
//             </span>
//           </label>
//           <button
//             className="icon icon-edit"
//             onClick={() =>
//               this.setState(({ editing }) => ({
//                 editing: !editing,
//                 value: this.props.todo.label,
//               }))
//             }
//           ></button>
//           <button className="icon icon-destroy" onClick={onDeleted}></button>
//         </div>
//         {this.state.editing && (
//           <form onSubmit={this.handleSubmit.bind(this)}>
//             <input
//               onChange={(event) => this.setState({ value: event.target.value })}
//               type="text"
//               className="edit"
//               value={this.state.value}
//               ref={this.inputRef}
//             />
//           </form>
//         )}
//       </li>
//     );
//   }
// }
Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    min: PropTypes.string,
    sec: PropTypes.string,
    done: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  id: PropTypes.number,
  label: PropTypes.string,
  done: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  minValue: PropTypes.string,
  secValue: PropTypes.string,
  tickTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  timerId: PropTypes.number,
};

Task.defaultProps = {
  todo: {},
};
