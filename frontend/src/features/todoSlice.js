// frontend/src/features/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Make sure your frontend .env contains:
// VITE_API_URL=http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL + "/todos";

// Fetch all todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(API_URL);
  return res.data; // should be array
});

// Add a new todo
export const addTodo = createAsyncThunk("todos/addTodo", async (title) => {
  const res = await axios.post(API_URL, { title });
  return res.data; // new todo object
});

// Update a todo
export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const res = await axios.put(`${API_URL}/${todo._id}`, todo);
  return res.data;
});

// Delete a todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [], status: null, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(t => t._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
