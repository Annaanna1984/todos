import React from "react";
import PropTypes from "prop-types";
export default class NewTaskForm extends React.Component {
  state = {
    label: "",
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.newItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          ></input>
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
