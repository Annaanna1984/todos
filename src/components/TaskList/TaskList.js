import Footer from "../Footer/Footer";
import TaskListItem from "../Task/Task";

const TaskList = ({todos}) => {
    const elements = todos.map((item)=>{
        const {id, ...itemProps} = item;
        return (
                <li key={id}>
                    <TaskListItem {...itemProps}/>
                </li>
                )
    })
    return (
        <section className='main'>
        <ul className='todo-list'>
            {elements}
        </ul>
        <Footer />
        </section>
    )
}

export default TaskList