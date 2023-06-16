import React from "react";
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from "prop-types";
export default class Task extends React.Component{
    state = {
        editing: false,
        value: '',
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            editItem,
            todo: {id},
        } = this.props;
        editItem(id, this.state.value);
        this.setState({ value: '' });
        this.setState({ editing: false });
    }
    render() {
        const {id, label, onDeleted, onToggleDone, done, date} = this.props;
        return (
            <li key={id} className={done ? 'completed' : this.state.editing ? 'editing' : null} >
            <div className={'view'} >
                <input
                       className="toggle"
                       type="checkbox"
                       checked={done}
                       readOnly
                ></input>
                <label onClick={onToggleDone}>
                    <span className="description " >{ label }</span>
                    <span className="created">
                        {`created ${formatDistanceToNow(date, {
                        includeSeconds: true,
                        locale: KG,
                        addSuffix: true,
                    })}`}
                    </span>
                </label>
                <button className="icon icon-edit" onClick={() => this.setState(({ editing }) => ({ editing: !editing, value: this.props.todo.label }))}></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
                {this.state.editing && (
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            onChange={(event) => this.setState({ value: event.target.value })}
                            type="text"
                            className="edit"
                            value={this.state.value}
                        />
                    </form>
                )}
            </li>
        )
    }
}
Task.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        done: PropTypes.bool,
        date: PropTypes.instanceOf(Date),
    }),
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
};

Task.defaultProps = {
    todo: {},
};