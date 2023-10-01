const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const todos = [];

// Create (POST)
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newTodo = {
    id,
    title,
    description,
    status: 'created',
    created_at: createdAt,
    updated_at: updatedAt,
  };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// Read (GET)
app.get('/todos', (req, res) => {
  res.status(200).json({ todos });
});

// Update (PUT)
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex !== -1) {
    todos[todoIndex].title = title;
    todos[todoIndex].description = description;
    todos[todoIndex].updated_at = new Date().toISOString();

    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Update (PATCH)
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex !== -1) {
    todos[todoIndex].status = status;
    todos[todoIndex].updated_at = new Date().toISOString();

    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.status(200).json({ message: `Todo dengan id ${id} dan judul ${deletedTodo[0].title} berhasil dihapus` });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
