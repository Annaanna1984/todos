const TaskListItem = ({label, important = false }) => {
    const styleItem = {
        color : important ? 'red' : 'black'
    }
    return (
    <div className={'view'} style={styleItem}>
        <input className="toggle" type="checkbox"></input>
            <label>
                <span className="description">{ label }</span>
                <span className="created">created 17 seconds ago</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
    </div>
    )
}

export default TaskListItem