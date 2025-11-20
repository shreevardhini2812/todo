// frontend/src/components/TodoList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "../features/todoSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos) || [];

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const toggleComplete = (todo) => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  return (
    <ul>
      {todos.length === 0 && <p className="text-gray-500">No todos yet.</p>}
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center text-white mb-2 p-2 border rounded"
        >
          <span
            onClick={() => toggleComplete(todo)}
            className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-white text-gray-400" : ""}`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => dispatch(deleteTodo(todo._id))}
            className="ml-4 text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
