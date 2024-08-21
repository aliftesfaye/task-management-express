const db = require("../database");

// Get all tasks
const getAllTasks = (callback) => {
  db.all("SELECT * FROM tasks", callback);
};

// Get a task by ID
const getTaskById = (id, callback) => {
  db.get("SELECT * FROM tasks WHERE id = ?", [id], callback);
};

// Create a new task
const createTask = (title, description, callback) => {
  db.run(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

// Update a task by ID
const updateTask = (id, title, description, callback) => {
  db.run(
    "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    function (err) {
      callback(err, this.changes);
    }
  );
};

// Delete a task by ID
const deleteTask = (id, callback) => {
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    callback(err, this.changes);
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
