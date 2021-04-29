import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { StateType } from './state/store';
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC } from './state/tasks-reducer';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from './state/todolists-reducer';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  const todolists = useSelector<StateType, Array<TodolistType>>(state => state.todolists);
  const tasks = useSelector<StateType, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();

  function removeTask(id: string, todolistId: string) {
    // let todolistTasks = tasks[todolistId];
    // tasks[todolistId] = todolistTasks.filter(t => t.id != id);
    // setTasks({ ...tasks });
    dispatch(RemoveTaskAC(todolistId, id));
  }

  function addTask(title: string, todolistId: string) {
    // let task = { id: v1(), title: title, isDone: false };
    // let todolistTasks = tasks[todolistId];
    // tasks[todolistId] = [task, ...todolistTasks];
    // setTasks({ ...tasks });
    dispatch(AddTaskAC(title, todolistId));
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    // let todolist = todolists.find(tl => tl.id === todolistId);
    // if (todolist) {
    //   todolist.filter = value;
    //   setTodolists([...todolists])
    // }
    dispatch(ChangeTodolistFilterAC(value, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    // let todolistTasks = tasks[todolistId];
    // let task = todolistTasks.find(t => t.id === id);
    // if (task) {
    //   task.isDone = isDone;
    //   setTasks({ ...tasks });
    // }
    dispatch(ChangeTaskStatusAC(todolistId, id, isDone));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    // let todolistTasks = tasks[todolistId];
    // let task = todolistTasks.find(t => t.id === id);
    // if (task) {
    //   task.title = newTitle;
    //   setTasks({ ...tasks });
    // }
    dispatch(ChangeTaskTitleAC(todolistId, id, newTitle));
  }

  function removeTodolist(id: string) {
    // setTodolists(todolists.filter(tl => tl.id != id));
    // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // setTasks({ ...tasks });
    dispatch(RemoveTodolistAC(id));
  }

  function changeTodolistTitle(id: string, title: string) {
    // const todolist = todolists.find(tl => tl.id === id);
    // if (todolist) {
    //   todolist.title = title;
    //   setTodolists([...todolists]);
    // }
    dispatch(ChangeTodolistTitleAC(title, id));
  }

  function addTodolist(title: string) {
    // let newTodolistId = v1();
    // let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' };
    // setTodolists([newTodolist, ...todolists]);
    // setTasks({
    //   ...tasks,
    //   [newTodolistId]: []
    // })
    dispatch(AddTodolistAC(title));
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {
        todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id];
          let tasksForTodolist = allTodolistTasks;

          if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
          }

          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        })
      }

    </div>
  );
}

export default AppWithRedux;
