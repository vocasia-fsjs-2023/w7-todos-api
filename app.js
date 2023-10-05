const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const todos = [
  {
    id: 1,
    title: 'Membuat Todos APP',
    description: 'deskripsi dalam membuat todos app dari judulnya',
    status: 'created',
    created_at: '2023-09-26T04:06:55.158Z',
    updated_at: '2023-09-26T04:06:55.158Z'
  }
];

app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const id = todos.length + 1;
  const newTodo = {
    id,
    title,
    description,
    status: 'created',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  todos.push(newTodo);
  res.json(`Todos dengan judul ${title} berhasil ditambahkan`);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json('Todo tidak ditemukan');
  }
  todo.title = title;
  todo.description = description;
  todo.updated_at = new Date().toISOString();
  res.json(`Todos dengan id ${id} berhasil diedit`);
});

app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json('Todo tidak ditemukan');
  }
  todo.status = status;
  todo.updated_at = new Date().toISOString();
  res.json(`Status pada Todos dengan id ${id} berhasil diubah`);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json('Todo tidak ditemukan');
  }
  todos.splice(index, 1);
  res.json(`Todos dengan id ${id} berhasil dihapus`);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
