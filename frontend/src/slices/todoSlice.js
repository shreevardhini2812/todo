import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios.js";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await API.get("/todos");
  return res.data;
});

export const addTodo = createAsyncThunk("todos/add", async (payload) => {
  const res = await API.post("/todos", payload);
  return res.data;
});

export const toggleTodo = createAsyncThunk("todos/toggle", async ({ id, completed }) => {
  const res = await API.put(`/todos/${id}`, { completed });
  return res.data;
});

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  await API.delete(`/todos/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchTodos.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchTodos.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(addTodo.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(toggleTodo.fulfilled, (s, a) => {
        s.items = s.items.map((t) => (t._id === a.payload._id ? a.payload : t));
      })
      .addCase(deleteTodo.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t._id !== a.payload);
      });
  },
});

export default todoSlice.reducer;
