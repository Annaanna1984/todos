import React from "react";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import TaskList from "./TaskList/TaskList";
import Footer from "./Footer/Footer";

export default class TodoApp extends React.Component {
  maxId = 100;
  state = {
    todoData: [],
    filter: "All",
  };
  createTodoItem(label, min, sec) {
    return {
      label,
      min,
      sec,
      minValue: min,
      secValue: sec,
      important: false,
      done: false,
      id: this.maxId++,
      date: new Date(),
      timerId: 0,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);
    const ret = [...before, newItem, ...after];
    return ret;
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  editItem(id, text) {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((element) => {
        if (element.id === id) element.label = text;
        return element;
      }),
    }));
  }

  stopTimer(id, timerId) {
    clearInterval(timerId);
    this.setState(({ todoData }) => ({
      todoData: todoData.map((element) => {
        if (element.id === id) element.timerId = 0;
        return element;
      }),
    }));
  }

  tickTimer(id) {
    const timerId = setInterval(() => {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((element) => {
          if (element.id === id) {
            if (element.done) {
              this.stopTimer(id, timerId);
              return element;
            }

            const secMinusOne = element.secValue - 1;
            const minMinusOne = element.minValue - 1;

            let newSec =
              secMinusOne < 10 && secMinusOne >= 0
                ? `0${secMinusOne}`
                : secMinusOne;

            if (newSec < 0 && element.minValue > 0) newSec = 59;

            if (element.minValue == 0 && newSec < 0) {
              this.stopTimer(id, timerId);
              return element;
            }

            let newMin =
              newSec === 59
                ? minMinusOne < 10 && minMinusOne >= 0
                  ? `0${minMinusOne}`
                  : minMinusOne
                : element.minValue;

            element.minValue = newMin;
            element.secValue = newSec;
            element.timerId = timerId;
          }
          return element;
        }),
      }));
      return timerId;
    }, 1000);
  }

  filteredItems() {
    const { todoData, filter } = this.state;
    return todoData.filter(({ done }) => {
      const all = filter === "All";
      const completed = filter === "Completed";
      return all ? true : completed ? done === true : done === false;
    });
  }

  clearCompleted() {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((element) => !element.done),
    }));
  }

  changeFilter(data) {
    this.setState({ filter: data });
  }
  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    return (
      <section className={"todoapp"}>
        <NewTaskForm newItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            editItem={this.editItem.bind(this)}
            onDeleted={this.deleteItem.bind(this)}
            onToggleDone={this.onToggleDone.bind(this)}
            todos={this.filteredItems()}
            tickTimer={this.tickTimer.bind(this)}
            stopTimer={this.stopTimer.bind(this)}
          />
          <Footer
            done={todoCount}
            changeFilter={this.changeFilter.bind(this)}
            clearCompleted={this.clearCompleted.bind(this)}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
