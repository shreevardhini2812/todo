// frontend/src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice.js";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
