import React from "react";
import PropTypes from "prop-types";
// export default class TasksFilter extends React.Component {
//   render() {
//     const { filter, changeFilter } = this.props;
//     return (
//       <ul className="filters">
//         <li>
//           <button
//             type="button"
//             onClick={() => changeFilter("All")}
//             className={filter === "All" ? "selected" : null}
//           >
//             All
//           </button>
//         </li>
//         <li>
//           <button
//             type="button"
//             onClick={() => changeFilter("Active")}
//             className={filter === "Active" ? "selected" : null}
//           >
//             Active
//           </button>
//         </li>
//         <li>
//           <button
//             type="button"
//             onClick={() => changeFilter("Completed")}
//             className={filter === "Completed" ? "selected" : null}
//           >
//             Completed
//           </button>
//         </li>
//       </ul>
//     );
//   }
// }
const TasksFilter = (props) => {
  const { filter, changeFilter } = props;
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          onClick={() => changeFilter("All")}
          className={filter === "All" ? "selected" : null}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => changeFilter("Active")}
          className={filter === "Active" ? "selected" : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => changeFilter("Completed")}
          className={filter === "Completed" ? "selected" : null}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};
export default TasksFilter;
TasksFilter.propTypes = {
  done: PropTypes.bool,
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  filter: "All",
};
