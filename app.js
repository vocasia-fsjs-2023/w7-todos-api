const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const todos = [];

// Endpoint membuat Todos baru
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const id = todos.length + 1;
    const status = 'created';
    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();

    const todoBaru = {
      id,
      title,
      description,
      status,
      created_at,
      updated_at,
    };
  
    todos.push(todoBaru);
    res.status(201).json(todoBaru);
});

// Endpoint menampilkan semua Todos
app.get('/todos', (req, res) => {
    res.status(200).json({ todos });
  });

// Endpoint mengupdate Todo berdasarkan ID
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (todo) {
        todo.title = title;
        todo.description = description;
        todo.updated_at = new Date().toISOString();
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo tidak ditemukan' });
    }
});


app.patch('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (todo) {
        todo.status = status;
        todo.updated_at = new Date().toISOString();
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo tidak ditemukan' });
    }
});

//menghapus Todo berdasarkan ID
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  
    if (todoIndex !== -1) {
      const deletedTodo = todos.splice(todoIndex, 1);
      res.status(200).json({ message: `Todo dengan id ${id} dan judul ${deletedTodo[0].title} berhasil dihapus` });
    } else {
      res.status(404).json({ message: 'Todo tidak ditemukan' });
    }
  });

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
