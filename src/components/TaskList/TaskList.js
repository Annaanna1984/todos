import Task from "../Task/Task";
import React from "react";
import PropTypes from "prop-types";

export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onToggleDone, editItem } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <Task
          {...itemProps}
          key={item.id}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          editItem={editItem}
          todo={item}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
TaskList.propTypes = {
  todos: PropTypes.any,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  // changeCheck: PropTypes.func.isRequired,
};
TaskList.defaultProps = {
  todos: {},
};
