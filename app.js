const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Atur port sesuai preferensi Anda
app.use(bodyParser.json());

const todos = [];
app.post('/todos', (req, res) => {
    // Ambil data dari body request
    const { title, description, status } = req.body;
    // Buat ID baru
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const created_at = new Date().toISOString();
    const updated_at = created_at;
  
    const newTodo = { id, title, description, status, created_at, updated_at };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });

  app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((item) => item.id === id);
  
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json(todo);
    }
  });

  app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;
    const todoIndex = todos.findIndex((item) => item.id === id);
  
    if (todoIndex === -1) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      todos[todoIndex] = {
        id,
        title,
        description,
        status,
        created_at: todos[todoIndex].created_at,
        updated_at: new Date().toISOString(),
      };
      res.json(todos[todoIndex]);
    }
  });

  app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;
    const todoIndex = todos.findIndex((item) => item.id === id);
  
    if (todoIndex === -1) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      const updatedTodo = {
        ...todos[todoIndex],
        title: title || todos[todoIndex].title,
        description: description || todos[todoIndex].description,
        status: status || todos[todoIndex].status,
        updated_at: new Date().toISOString(),
      };
      todos[todoIndex] = updatedTodo;
      res.json(updatedTodo);
    }
  });

  app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((item) => item.id === id);
  
    if (todoIndex === -1) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      todos.splice(todoIndex, 1);
      res.json({ message: 'Todo deleted successfully' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  