const express = require('express');
const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan

app.use(express.json());

const todos = []; // Array untuk menyimpan daftar ToDo

// Endpoint untuk membuat ToDo baru
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const id = todos.length + 1;
  const created_at = new Date().toISOString();
  const updated_at = new Date().toISOString();

  const newTodo = {
    id,
    title,
    description,
    status: 'created',
    created_at,
    updated_at,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Endpoint untuk membaca semua ToDo
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Endpoint untuk membaca ToDo berdasarkan ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

// Endpoint untuk mengupdate ToDo berdasarkan ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.title = title;
  todo.description = description;
  todo.updated_at = new Date().toISOString();

  res.json(todo);
});

// Endpoint untuk menghapus ToDo berdasarkan ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.json({ message: 'Todo deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
