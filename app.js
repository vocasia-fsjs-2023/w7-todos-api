const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Data todos sementara
let todos = [];

// POST /todos - Membuat todo baru
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    description: req.body.description,
    status: 'created',
    created_at: getCurrentDate(),
    updated_at: getCurrentDate(),
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos - Mendapatkan semua todos
app.get('/todos', (req, res) => {
  res.status(200).json({ todos });
});

// PUT /todos/:id - Mengedit todo
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = {
    id: todoId,
    title: req.body.title,
    description: req.body.description,
    status: 'created',
    created_at: getCurrentDate(),
    updated_at: getCurrentDate(),
  };

  const index = findTodoIndexById(todoId);
  if (index !== -1) {
    todos[index] = updatedTodo;
    res.status(200).json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// PATCH /todos/:id - Mengubah status todo
app.patch('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const newStatus = req.body.status;

  const index = findTodoIndexById(todoId);
  if (index !== -1) {
    todos[index].status = newStatus;
    todos[index].updated_at = getCurrentDate();
    res.status(200).json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE /todos/:id - Menghapus todo
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);

  const index = findTodoIndexById(todoId);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    res.status(200).json({ message: `Todo dengan id ${todoId} dan judul ${deletedTodo.title} berhasil dihapus` });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Fungsi untuk mendapatkan tanggal saat ini dalam format "YYYY-MM-DD"
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Fungsi untuk mencari indeks todo berdasarkan ID
function findTodoIndexById(id) {
  return todos.findIndex((todo) => todo.id === id);
}

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
