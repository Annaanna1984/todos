import Task from "../Task/Task";
import React from "react";
import PropTypes from "prop-types";

const TaskList = (props) => {
  const { todos } = props;
  const elements = todos.map((item) => {
    return <Task key={item.id} todo={item} />;
  });
  return <ul className="todo-list">{elements}</ul>;
};
export default TaskList;
TaskList.propTypes = {
  todos: PropTypes.any,
};
TaskList.defaultProps = {
  todos: {},
};
