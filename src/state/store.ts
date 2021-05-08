import {combineReducers, createStore} from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from "./todolists-reducer"

const reducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export const store = createStore(reducer);
export type StateType = ReturnType<typeof reducer>;