const taskModel = require("../models/taskModel");

// Get all tasks
const getAllTasks = (req, res) => {
  taskModel.getAllTasks((err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
};

// Get a task by ID
const getTaskById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  taskModel.getTaskById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  });
};

// Create a new task
const createTask = (req, res) => {
  const { title, description } = req.body;
  taskModel.createTask(title, description, (err, id) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ id, title, description });
  });
};

// Update a task by ID
const updateTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;
  taskModel.updateTask(id, title, description, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (changes > 0) {
      res.json({ id, title, description });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  });
};

// Delete a task by ID
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  taskModel.deleteTask(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (changes > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
