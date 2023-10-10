const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const todos = [];

// Create 
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  const currentDate = new Date().toISOString().split('T')[0];
  newTodo.id = todos.length + 1;
  newTodo.status = 'created';
  newTodo.created_at = currentDate;
  newTodo.updated_at = currentDate;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route untuk mendapatkan semua todo
app.get('/todos', (req, res) => {
  res.status(200).json({ todos });
});

// Route untuk mengedit todo berdasarkan ID
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    updatedTodo.id = todoId;
    updatedTodo.status = 'created';
    updatedTodo.created_at = todos[todoIndex].created_at;
    updatedTodo.updated_at = new Date().toISOString().split('T')[0];
    todos[todoIndex] = updatedTodo;
    res.status(200).json(updatedTodo);
  } else {
    res.status(404).json({ error: 'Todo tidak ditemukan' });
  }
});

// Update
app.patch('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { status } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todos[todoIndex].status = status;
    todos[todoIndex].updated_at = new Date().toISOString().split('T')[0];
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo tidak ditemukan' });
  }
});

// Delete
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.status(200).json({ message: `Todo dengan ID ${todoId} berhasil dihapus`, deletedTodo: deletedTodo[0] });
  } else {
    res.status(404).json({ error: 'Todo tidak ditemukan' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
