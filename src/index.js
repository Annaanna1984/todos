import React from "react";
import { createRoot } from 'react-dom/client';
import TaskList from "./components/TaskList/TaskList";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import './style.css'

const container = document.getElementById('root')
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const TodoApp = ()=>{
    const todoData = [
        {label: 'drink coffee', important: false, id: 1},
        {label: 'eat cheese', important: true, id: 2},
        {label: 'drink water', important: false, id: 3},
    ]
    return (<section className={'todoapp'} >
        <NewTaskForm />
        <TaskList todos ={todoData}/>
    </section>
    )
}

root.render(<TodoApp />);
