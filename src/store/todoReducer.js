import {
    TODO_ADD, TODO_APPLY, 
    TODO_REMOVE, 
    TODO_FETCH_START, 
    TODO_FETCH_SUCCESS, 
    TODO_MESSAGE,
    TODO_CHANGE_INPUT,
    CLOSE_ALERT
} from './actionTypes'

const initialState = {
    loading: true,
    todos: [],
    alert: {
        type: 'secondary',
        isAlert: false,
        message: null,
},
    currentItem: '',
    time: null
}

export default function todoReducer(state = initialState, action) {
    switch (action.type){
        case TODO_FETCH_START:
            return {
                ...state,
                loading: true
            }
        case TODO_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.todos
            }
        case TODO_MESSAGE:
            return {
                ...state,
                alert: action.alert
            }
        case TODO_CHANGE_INPUT:
            return {
                ...state,
                currentItem: action.currentItem
            }
        case TODO_ADD:
            return {
                ...state,
                todos: action.todos,
                currentItem: ''
            }
        case TODO_APPLY:
            return {
                ...state,
                todos: action.todos,
            }
        case TODO_REMOVE:
            return {
                ...state,
                todos: action.todos
            }
        case CLOSE_ALERT:
            return {
                ...state,
                alert: action.alert
            }
        default: 
            return state
    }
}