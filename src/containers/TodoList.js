import React, { Component } from 'react'
import Todoitem from '../componets/TodoItem'
import AddTodo from '../componets/AddTodo'
import Loading from '../componets/Loading'
import Alert from '../componets/Alert'
import {connect} from 'react-redux'
import {todoFetch, todoApply, todoRemove, todoChange, todoAdd, closeAlert} from '../store/todoAction'

class TodoList extends Component {
    async componentDidMount() {
        this.props.todoFetch()
    }

    render() {
        return (
            <div className="container">
                <h1>Список задач</h1>
                <ul className="list-group">
                <AddTodo 
                    addTodo={() => this.props.todoAdd()}
                    onChangeTodo={(value) => this.props.todoChange(value)}
                    currentItem={this.props.currentItem}
                />
                <hr/>
                {this.props.alert.isAlert && <Alert
                    alert={this.props.alert}
                    hide={this.props.closeAlert}
                />}

                
                <hr/>
                {this.props.loading &&  <Loading />}
                {!this.props.todos.length && !this.props.loading && <p>Список пуст</p>}
                {this.props.todos.map((todo, index) => {
                    return <Todoitem 
                        key={todo.id} 
                        todo={todo} 
                        index={index} 
                        onToggle={() => this.props.todoApply(index)}
                        onClose = {() => this.props.todoRemove(todo.id)}
                    />
                })
                }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loading: state.todo.loading,
        todos: state.todo.todos,
        currentItem: state.todo.currentItem,
        alert: state.todo.alert,
    }
}

function mapDispatchToProps(dispatch){
    return {
        todoFetch: () => dispatch(todoFetch()),
        todoApply: id => dispatch(todoApply(id)),
        todoRemove: id => dispatch(todoRemove(id)),
        todoChange: currentItem => dispatch(todoChange(currentItem)),
        todoAdd: () => dispatch(todoAdd()),
        closeAlert: () => dispatch(closeAlert()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)