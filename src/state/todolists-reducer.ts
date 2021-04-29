import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../AppWithRedux';

export type RemoveTodolistActionType = {
  type: 'REMOVE_TODOLIST',
  id: string
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({ type: 'REMOVE_TODOLIST', id: todolistId });

export type AddTodolistActionType = {
  type: 'ADD_TODOLIST',
  title: string,
  todolistId: string
}
export const AddTodolistAC = (title: string): AddTodolistActionType => ({ type: 'ADD_TODOLIST', title, todolistId: v1()});

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE',
  id: string,
  title: string
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => ({ type: 'CHANGE_TODOLIST_TITLE', id, title });

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER',
  id: string,
  filter: FilterValuesType
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => ({ type: 'CHANGE_TODOLIST_FILTER', id, filter });

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

const initialState = [] as Array<TodolistType>;

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD_TODOLIST':
      return [...state, { id: action.todolistId, title: action.title, filter: 'all' }];
    case 'CHANGE_TODOLIST_TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
    case 'CHANGE_TODOLIST_FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
    default:
      return state;
  }
}