const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const todoArray = []; 

// Membuat TO-DO (POST | Create)
app.post('/todos', (req, res) => {
  const { title, description, status } = req.body;
  const id = todoArray.length + 1; // Incremental ID
  const created_at = new Date();
  const updated_at = created_at;

  const todo = { id, title, description, status, created_at, updated_at };
  todoArray.push(todo);
  res.status(201).json(todo);
});

// Read seluruh TO-DO (GET | Read)
app.get('/todos', (req, res) => {
  res.json(todoArray);
});

// Read TO-DO berdasarkan ID (GET | Read)
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todoArray.find((t) => t.id === id);

  if (!todo) {
    res.status(404).json({ message: 'TODO not found' });
  } else {
    res.json(todo);
  }
});

// Update To-Do (UPDATE)
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const todoIndex = todoArray.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ message: 'TODO not found' });
  } else {
    todoArray[todoIndex] = {
      id,
      title,
      description,
      status,
      created_at: todoArray[todoIndex].created_at,
      updated_at: new Date(),
    };
    res.json(todoArray[todoIndex]);
  }
});

// Update To-Do berdasarkan atribut yang ingin diubah (UPDATE)
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  const todoIndex = todoArray.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ message: 'TODO not found' });
  } else {
    Object.assign(todoArray[todoIndex], updates, { updated_at: new Date() });
    res.json(todoArray[todoIndex]);
  }
});

// Delete To-Do (DELETE)
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todoArray.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ message: 'TODO not found' });
  } else {
    const deletedTodo = todoArray.splice(todoIndex, 1);
    res.json(deletedTodo[0]);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
