// frontend/src/App.jsx
import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import './App.css';

export default function App() {
  return (
    
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow border relative left-120 bg-black w-120">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}
