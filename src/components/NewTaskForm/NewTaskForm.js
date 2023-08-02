import React from "react";
import PropTypes from "prop-types";
export default class NewTaskForm extends React.Component {
  state = {
    label: "",
    min: "",
    sec: "",
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const formatTime = (time) => {
      time = parseInt(time, 10);
      if (time >= 10) {
        return time;
      }
      return `0${time}`;
    };

    this.props.newItemAdded(
      this.state.label,
      this.state.min.length === 0 ? "00" : formatTime(this.state.min),
      this.state.sec.length === 0 ? "00" : formatTime(this.state.sec)
    );
    this.setState({
      label: "",
      min: "",
      sec: "",
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            required={true}
            onChange={this.onLabelChange}
            value={this.state.label}
          ></input>
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            min="0"
            max="59"
            onChange={this.onMinChange}
            value={this.state.min}
          ></input>
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            min="0"
            max="59"
            onChange={this.onSecChange}
            value={this.state.sec}
          ></input>
          <input type="submit" style={{ display: "none" }} />
        </form>
      </header>
    );
  }
}
NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  newItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  placeholder: "What needs to be done?",
  title: "Todos",
};
