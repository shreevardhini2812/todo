// frontend/src/components/TodoInput.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

export default function TodoInput() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await dispatch(addTodo(title)).unwrap(); // unwrap ensures payload or error
      setTitle(""); // clear input
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  return (
    <div className="flex mb-4 text-white">
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a todo"
        className="border p-2 flex-grow rounded"
      />
      <button
        onClick={handleAdd}
        className="ml-2 px-4 py-2 bg-blue-500 text-black rounded "
      >
        Add
      </button>
    </div>
  );
}
