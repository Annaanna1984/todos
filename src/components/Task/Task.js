import React from "react";
import { formatDistanceToNow } from "date-fns";
import KG from "date-fns/locale/en-AU";
import PropTypes from "prop-types";

export default class Task extends React.Component {
  state = {
    editing: false,
    value: "",
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
                  if (this.props.todo.done || this.props.timerId) return;
                  this.props.tickTimer(id);
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  if (!this.props.todo.done) {
                    this.props.stopTimer(id, this.props.timerId);
                  }
                }}
              ></button>
              <span className="new-todo-form__timer">{`${this.props.minValue}:${this.props.secValue}`}</span>
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
  minValue: PropTypes.string,
  secValue: PropTypes.string,
  tickTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  timerId: PropTypes.number,
};

Task.defaultProps = {
  todo: {},
};
