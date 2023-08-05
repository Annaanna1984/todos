import React from "react";
import { formatDistanceToNow } from "date-fns";
import KG from "date-fns/locale/en-AU";
import PropTypes from "prop-types";

export default class Task extends React.Component {
  state = {
    editing: false,
    min: this.props.todo.min,
    sec: this.props.todo.sec,
    value: "",
    timerId: "",
  };
  inputRef = React.createRef();

  handleSubmit(event) {
    event.preventDefault();
    const {
      editItem,
      todo: { id },
    } = this.props;
    editItem(id, this.state.value);
    this.setState({ value: "" });
    this.setState({ editing: false });
  }

  handleEscPress = (event) => {
    if (event.key === "Escape" && this.state.editing) {
      event.preventDefault();
      this.setState(() => ({ editing: false }));
    }
  };

  handleClickOutside = (event) => {
    if (
      this.inputRef.current &&
      !this.inputRef.current.contains(event.target) &&
      this.state.editing
    ) {
      this.setState(() => ({ editing: false }));
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleEscPress);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscPress);
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  stopTimer() {
    clearInterval(this.state.timerId);
    this.setState(() => ({ timerId: "" }));
  }

  render() {
    const { id, label, done, date } = this.props.todo;
    const { onDeleted, onToggleDone } = this.props;
    return (
      <li
        key={id}
        className={done ? "completed" : this.state.editing ? "editing" : null}
      >
        <div className={"view"}>
          <input
            id={`${id}`}
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
            readOnly
          ></input>
          <label htmlFor={`${id}`}>
            <span className="title ">{label}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => {
                  if (this.props.todo.done || this.state.timerId) return;

                  const timer = setInterval(() => {
                    if (this.props.todo.done) {
                      this.stopTimer();
                      return;
                    }

                    const secMinusOne = this.state.sec - 1;
                    const minMinusOne = this.state.min - 1;

                    let newSec =
                      secMinusOne < 10 && secMinusOne >= 0
                        ? `0${secMinusOne}`
                        : secMinusOne;

                    if (newSec < 0 && this.state.min > 0) newSec = 59;

                    if (this.state.min == 0 && newSec < 0) {
                      this.stopTimer();
                      return;
                    }

                    let newMin =
                      newSec === 59
                        ? minMinusOne < 10 && minMinusOne >= 0
                          ? `0${minMinusOne}`
                          : minMinusOne
                        : this.state.min;

                    this.setState(() => ({
                      sec: newSec,
                      min: newMin,
                    }));
                  }, 1000);
                  this.setState(() => ({ timerId: timer }));
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  if (!this.props.todo.done) {
                    this.stopTimer();
                  }
                }}
              ></button>
              <span className="new-todo-form__timer">{`${this.state.min}:${this.state.sec}`}</span>
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
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                value: this.props.todo.label,
              }))
            }
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {this.state.editing && (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              onChange={(event) => this.setState({ value: event.target.value })}
              type="text"
              className="edit"
              value={this.state.value}
              ref={this.inputRef}
            />
          </form>
        )}
      </li>
    );
  }
}
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
};

Task.defaultProps = {
  todo: {},
};
