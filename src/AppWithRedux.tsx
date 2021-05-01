import React from 'react';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import AddItemForm from "./AddItemForm";
import { AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from './state/todolists-reducer';
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC } from './state/tasks-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from './state/store';

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
    dispatch(RemoveTaskAC(todolistId, id));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(AddTaskAC(title, todolistId));
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(ChangeTodolistFilterAC(value, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(ChangeTaskStatusAC(todolistId, id, isDone));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatch(ChangeTaskTitleAC(todolistId, id, newTitle));
  }

  function removeTodolist(id: string) {
    dispatch(RemoveTodolistAC(id));
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatch(ChangeTodolistTitleAC(title, id));
  }

  function addTodolist(title: string) {
    dispatch(AddTodolistAC(title));
  }

  return (
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant={"h6"}>
            News
                    </Typography>
          <Button color={"inherit"}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
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

              return <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
