import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "../slices/todosSlice.js";

function TodoItem({ t, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded shadow mb-2">
      <div>
        <label className="flex items-center space-x-3">
          <input type="checkbox" checked={t.completed} onChange={() => onToggle(t._id, !t.completed)} />
          <span className={t.completed ? "line-through text-gray-500" : ""}>{t.text}</span>
        </label>
      </div>
      <div>
        <button onClick={() => onDelete(t._id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
}

export default function TodoPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.todos);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await dispatch(addTodo({ text }));
    setText("");
  };

  const handleToggle = (id, completed) => dispatch(toggleTodo({ id, completed }));
  const handleDelete = (id) => dispatch(deleteTodo(id));

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Todos</h1>

      <form onSubmit={submit} className="flex mb-4">
        <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 p-2 border rounded-l" placeholder="Add todo..." />
        <button className="px-4 bg-green-600 text-white rounded-r">Add</button>
      </form>

      {loading && <div>Loading todos...</div>}
      {items.length === 0 && !loading && <div className="text-gray-600">No todos yet.</div>}

      <div>
        {items.map((t) => (
          <TodoItem key={t._id} t={t} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
