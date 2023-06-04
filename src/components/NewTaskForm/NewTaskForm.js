const Title = () =>{
    return (
        <h1>todos</h1>
    )
}

const InputForm = () =>{
    return(
            <input className="new-todo" placeholder="What needs to be done?" autoFocus></input>
    )
}

const NewTaskForm = () =>{
    return(
        <header className="header">
            <Title />
            <InputForm />
        </header>
    )
}

export default NewTaskForm;