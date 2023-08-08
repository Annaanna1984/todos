import Task from "../Task/Task";
import React from "react";
import PropTypes from "prop-types";

// export default class TaskList extends React.Component {
//   render() {
//     const { todos, onDeleted, onToggleDone, editItem, tickTimer, stopTimer } =
//       this.props;
//
//     const elements = todos.map((item) => {
//       const { id, ...itemProps } = item;
//       return (
//         <Task
//           {...itemProps}
//           key={item.id}
//           onDeleted={() => onDeleted(id)}
//           onToggleDone={() => onToggleDone(id)}
//           editItem={editItem}
//           tickTimer={tickTimer}
//           stopTimer={stopTimer}
//           todo={item}
//           minValue={item.minValue}
//           secValue={item.secValue}
//           timerId={item.timerId}
//         />
//       );
//     });
//     return <ul className="todo-list">{elements}</ul>;
//   }
// }
const TaskList = (props) => {
  const { todos } = props;
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        {...itemProps}
        key={id}
        todo={item}
        minValue={item.minValue}
        secValue={item.secValue}
        timerId={item.timerId}
      />
    );
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
