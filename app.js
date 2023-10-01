const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk mengizinkan body JSON di request
app.use(express.json());

// Data To-Do disimpan dalam array
const todos = [];

// Route untuk menampilkan semua To-Do
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Route untuk menambahkan To-Do baru
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const id = todos.length + 1;
  const status = 'created';
  const created_at = new Date().toISOString();
  const updated_at = new Date().toISOString();

  const newTodo = { id, title, description, status, created_at, updated_at };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// Route untuk mengupdate To-Do berdasarkan ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'To-Do not found.' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    description: description || todos[todoIndex].description,
    status: status || todos[todoIndex].status,
    updated_at: new Date().toISOString(),
  };

  res.json(todos[todoIndex]);
});

// Route untuk patch
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ message: 'TODO not found' });
  } else {
    const updatedTodo = { ...todos[todoIndex], title, description, status, updated_at: new Date().toISOString() };
    todos[todoIndex] = updatedTodo;
    res.json(updatedTodo);
  }
});

// Route untuk menghapus To-Do berdasarkan ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'To-Do not found.' });
  }

  todos.splice(todoIndex, 1);

  res.json({ message: 'To-Do deleted successfully.' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
