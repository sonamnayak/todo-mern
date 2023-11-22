import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const STATUSES = Object.freeze({
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});

export const fetchTodosThunk = createAsyncThunk("todos/fetch", async () => {
  const res = await axios.get(
    "https://todo-mern-backend-vliz.onrender.com/api/tasks",
    { withCredentials: true }
  );
  return res.data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    filterStatus: "all",
    todoList: [],
    status: STATUSES.LOADING,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      axios
        .post(
          "https://todo-mern-backend-vliz.onrender.com/api/tasks",
          action.payload,
          { withCredentials: true }
        )
        .then(() => toast.success("Task added successfully!"))
        .catch((err) => console.log(err));
    },
    deleteTodo: (state, action) => {
      const todoItems = state.todoList.filter(
        (todo) => todo._id !== action.payload
      );
      axios
        .delete(
          `https://todo-mern-backend-vliz.onrender.com/api/tasks/${action.payload}`,
          { withCredentials: true }
        )
        .then(() => toast.success("Task deleted successfully!"))
        .catch((err) => console.log(err));
      state.todoList = todoItems;
    },
    updateTodo: (state, action) => {
      const todoItems = state.todoList;
      todoItems.forEach((todo) => {
        if (todo._id === action.payload._id) {
          todo.title = action.payload.title;
          todo.status = action.payload.status;
        }
      });
      state.todoList = todoItems;
      axios
        .put(
          `https://todo-mern-backend-vliz.onrender.com/api/tasks/${action.payload._id}`,
          action.payload,
          { withCredentials: true }
        )
        .catch((err) => console.log(err));
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
