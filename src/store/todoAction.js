import {
    TODO_ADD, 
    TODO_APPLY, 
    TODO_REMOVE, 
    TODO_FETCH_START, 
    TODO_FETCH_SUCCESS, 
    TODO_MESSAGE, 
    TODO_CHANGE_INPUT,
    CLOSE_ALERT
} from './actionTypes'

export function todoFetch() {
    return async dispatch => {
        dispatch(fetchTodoStart())
        try {
            const todos = await (await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')).json()
            dispatch(fetchTodoSuccess(todos))
        } catch (e) {
            dispatch(todoMessage(e))
        }
    }
}

export function todoApply(id) {
    return (dispatch, getState) => {
        const todos = [...getState().todo.todos]
        todos[id].completed = !todos[id].completed
        todos[id].time = Date.now()
        dispatch ({type: TODO_APPLY, todos})
    }
}

export function todoRemove(id) {
    return (dispatch, getState) => {
        let todos = [...getState().todo.todos]
        todos = todos.filter(todo => todo.id !== id)
        dispatch({type: TODO_REMOVE, todos})
        dispatch(todoMessage('Задача удалена', 'success'))
    }
}

export function todoChange(currentItem) {
    return {
        type: TODO_CHANGE_INPUT,
        currentItem
    }
}

export function todoAdd(){
    return (dispatch, getState) => {
        const state = getState().todo
        const currentItem = state.currentItem
        if (!currentItem.trim()) {
            dispatch(todoMessage('Введите задачу', 'danger'))
            return
        }
        if (currentItem.trim().length < 3) {
            dispatch(todoMessage('Минимальное число символов 3'))
            return
        }
        console.log(currentItem);
        const todos = [...state.todos]
        todos.push({
            id: Date.now(),
            completed: false,
            title: currentItem
        })
        dispatch({ type:TODO_ADD, todos})
        dispatch(todoMessage('Задача создана', 'success'))
        // this.setState({todos, currentItem: ''})
    }
}


export function fetchTodoStart() {
    return {
        type: TODO_FETCH_START
    }
}

export function fetchTodoSuccess(todos) {
    return {
        type: TODO_FETCH_SUCCESS,
        todos
    }
}

export function todoMessage(message, types) {
    return (dispatch) => {
        const alert = {}
        alert.type = types || 'secondary'
        alert.message = message
        alert.isAlert = true
    dispatch ({type: TODO_MESSAGE, alert})
    }
}

export function closeAlert() {
    return {
        type: CLOSE_ALERT,
        alert: {type: 'secondary',
        isAlert: false,
        message: null,}
    }
}