import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error("GET /todos error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new todo
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (err) {
    console.error("POST /todos error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.title = req.body.title ?? todo.title;
    todo.completed = req.body.completed ?? todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error("PUT /todos/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("DELETE /todos/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
