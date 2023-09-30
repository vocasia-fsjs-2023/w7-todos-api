const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Data Todos (array) untuk menyimpan daftar tugas
const todos = [];
let nextId = 1; // ID berikutnya

class Todo {
    constructor(id, title, description) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = 'created';
      
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      
      this.created_at = `${year}-${month}-${day}`;
      this.updated_at = `${year}-${month}-${day}`;
    }
}
  
// Endpoint untuk membuat Tugas baru (Create)
app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  // Membuat ID secara otomatis
  const newTodo = new Todo(nextId, title, description);
  todos.push(newTodo);
  nextId++; // Tingkatkan ID berikutnya
  res.status(201).json(newTodo);
});

// Endpoint untuk mengambil semua Tugas (Read All)
app.get('/todos', (req, res) => {
  res.status(200).json({ todos });
});

// Endpoint untuk mengambil Tugas berdasarkan ID (Read by ID)
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: 'Todo tidak ditemukan' });
  }
});

// Endpoint untuk mengubah Tugas berdasarkan ID (Update)
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].title = title;
    todos[todoIndex].description = description;
    todos[todoIndex].updated_at = new Date().toISOString();
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo tidak ditemukan' });
  }
});

// Endpoint untuk mengubah Status Tugas berdasarkan ID (Update Status)
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].status = status;
    todos[todoIndex].updated_at = new Date().toISOString();
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo tidak ditemukan' });
  }
});

// Endpoint untuk menghapus Tugas berdasarkan ID (Delete)
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const deletedTodo = todos.splice(todoIndex, 1)[0];
      res.status(200).json({ message: `Tugas dengan ID ${id} dan judul '${deletedTodo.title}' berhasil dihapus` });
    } else {
      res.status(404).json({ message: 'Todo tidak ditemukan' }); // Ubah pesan menjadi 'Tugas tidak ditemukan'
    }
  });
  

// Mendengarkan pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Server sedang berjalan di port ${port}`);
});
