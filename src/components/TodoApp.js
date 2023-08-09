import React, { useEffect, useRef, useState } from "react";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import TaskList from "./TaskList/TaskList";
import Footer from "./Footer/Footer";

let id = 100;
export const Context = React.createContext(null);
const TodoApp = () => {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState("All");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTodoData(
        todoData.map((todo) => {
          if (!todo.isPaused) {
            const newTime = todo.time - 1;

            if (newTime < 0) {
              todo.isPaused = true;
            } else {
              todo.time = newTime;
            }
          }
          return todo;
        })
      );
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  });

  const onToggleTimer = (id, pause) => {
    setTodoData(
      todoData.map((todo) => {
        if (todo.id === id && !todo.done) todo.isPaused = pause;
        return todo;
      })
    );
  };

  const addItem = (label, time) => {
    const newItem = {
      id: id++,
      label,
      time,
      important: false,
      done: false,
      date: new Date(),
      isPaused: true,
    };
    setTodoData([...todoData, newItem]);
  };

  const editItem = (id, text) => {
    setTodoData(
      todoData.map((element) => {
        if (element.id === id) element.label = text;
        return element;
      })
    );
  };

  const deleteItem = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const onToggleDone = (id) => {
    setTodoData(
      todoData.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
          todo.isPaused = true;
        }
        return todo;
      })
    );
  };

  const filteredItems = () => {
    return todoData.filter(({ done }) => {
      const all = filter === "All";
      const completed = filter === "Completed";
      return all ? true : completed ? done === true : done === false;
    });
  };

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const clearCompleted = () => {
    setTodoData(todoData.filter((element) => !element.done));
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  return (
    <section className={"todoapp"}>
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <Context.Provider
          value={{
            editItem,
            deleteItem,
            onToggleDone,
            onTimerToggle: onToggleTimer,
          }}
        >
          <TaskList todos={filteredItems()} />
        </Context.Provider>
        <Footer
          done={todoCount}
          changeFilter={changeFilter}
          clearCompleted={clearCompleted}
          filter={filter}
        />
      </section>
    </section>
  );
};

export default TodoApp;
