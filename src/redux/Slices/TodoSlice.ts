import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodoState } from "../../types/types";

const initialState: ITodoState = {
  todos: [],
  todosChange: [""],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, actions) {
      state.todos = [...state.todos, actions.payload];
    },
    deleteTodo(state, actions) {
      state.todos = state.todos.filter((obj) => obj.id !== actions.payload);
    },
    todoFinish(state, actions) {
      const findTodo = state.todos.find((obj) => obj.id === actions.payload);
      if (findTodo) {
        findTodo.done = !findTodo.done;
      }
    },
    onChangeTodo(state, actions) {
      const findTodo = state.todos.find((obj) => obj.id === actions.payload);
      if (findTodo) {
        findTodo.title = actions.payload;
      }
    },
    todoClicked(state, actions) {
      const findTodo = state.todos.find((obj) => obj.id === actions.payload);
      if (findTodo) {
        state.todosChange = [findTodo.title];
      }
    },
    todoChange(state, actions) {
      const newFindTitle = actions.payload;
      state.todosChange = [newFindTitle];
    },
    todoUpdate(state, actions) {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === actions.payload) {
          return {
            ...todo,
            title: state.todosChange[0],
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  todoFinish,
  onChangeTodo,
  todoClicked,
  todoChange,
  todoUpdate,
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
