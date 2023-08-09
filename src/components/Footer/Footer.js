import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter/TasksFilter";

const Footer = (props) => {
  const { done, clearCompleted, changeFilter, filter } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{done} items left</span>
      <TasksFilter filter={filter} changeFilter={changeFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
export default Footer;
Footer.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
  done: PropTypes.number,
};

Footer.defaultProps = {
  filter: "All",
};
