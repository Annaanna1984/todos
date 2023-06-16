
import { createRoot } from 'react-dom/client';
// import TaskList from "./components/TaskList/TaskList";
// import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TodoApp from "./components/TodoApp";
import './style.css'
import React from "react";

const container = document.getElementById('root')
const root = createRoot(container); // createRoot(container!) if you use TypeScript


root.render(
        <TodoApp />
    );
