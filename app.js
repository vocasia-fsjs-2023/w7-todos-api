const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Inisialisasi data todos
let todos = [
  {
    id: 1,
    title: "Create POST in TODO App",
    description: "Membuat API Post Pada Todos app untuk menambahkan todo list",
    status: "created",
    created_at: "2023-09-26",
    updated_at: "2023-09-26"
  }
];

// Middleware untuk validasi todo
function validateTodoData(req, res, next) {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).json({ error: 'Field title, description, and status are required' });
  }
  if (status !== 'created' && status !== 'in_progress' && status !== 'done') {
    return res.status(400).json({ error: 'Invalid status value' });
  }
  next();
}

// Endpoint untuk menambahkan todo
app.post('/todos', validateTodoData, (req, res) => {
  const { title, description, status } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description,
    status,
    created_at: new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString().split('T')[0]
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Endpoint untuk mendapatkan semua todos
app.get('/todos', (req, res) => {
  res.status(200).json({ todos });
});

// Endpoint untuk mengedit todo berdasarkan ID
app.put('/todos/:id', validateTodoData, (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const todo = todos.find(todo => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todo.title = title;
  todo.description = description;
  todo.status = status;
  todo.updated_at = new Date().toISOString().split('T')[0];
  res.status(200).json(todo);
});

// Endpoint untuk mengubah status todo menjadi "in_progress" atau "done"
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = todos.find(todo => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todo.status = status;
  todo.updated_at = new Date().toISOString().split('T')[0];
  res.status(200).json(todo);
});

// Endpoint untuk menghapus todo berdasarkan ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(200).json({ message: `Todo dengan id ${id} berhasil dihapus` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
