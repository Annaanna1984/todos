import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter/TasksFilter";

export default class Footer extends React.Component{
    render() {
        const{done, clearCompleted, changeFilter, filter } = this.props
        return (
            <footer className="footer">
                <span className="todo-count">{done} items left</span>
                <TasksFilter filter={filter} changeFilter={changeFilter} />
                <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
            </footer>
        )
    }
}
Footer.propTypes = {
    lefts: PropTypes.number,
    clearCompleted: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
};

Footer.defaultProps = {
    filter: 'All',
};