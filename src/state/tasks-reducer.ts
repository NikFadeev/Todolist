import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export type RemoveTaskActionType = {
  type: 'REMOVE_TASK',
  todolistId: string,
  taskId: string,
}
export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => ({ type: 'REMOVE_TASK', todolistId, taskId });

export type AddTaskActionType = {
  type: 'ADD_TASK',
  todolistId: string,
  title: string
}
export const AddTaskAC = (title: string, todolistId: string): AddTaskActionType => ({ type: 'ADD_TASK', todolistId, title });

export type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS',
  todolistId: string,
  taskId: string
  isDone: boolean
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => ({ type: 'CHANGE_TASK_STATUS', todolistId, taskId, isDone });

export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE',
  todolistId: string,
  taskId: string
  title: string
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => ({ type: 'CHANGE_TASK_TITLE', todolistId, taskId, title });

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | RemoveTodolistActionType | AddTodolistActionType;

const initialState = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    case 'ADD_TASK':
      return {
        ...state,
        [action.todolistId]: [...state[action.todolistId], { id: v1(), title: action.title, isDone: false }]
      }
    case 'CHANGE_TASK_STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
      }
    case 'CHANGE_TASK_TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
      }
    case 'REMOVE_TODOLIST':
      const copy = { ...state };
      delete copy[action.id];
      return copy;
    case 'ADD_TODOLIST':
      return {
        ...state,
        [action.todolistId]: []
      }
    default:
      return state;
  }
}
