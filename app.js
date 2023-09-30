const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const todos = [];

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});

//POST
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const newTodo = {
        id: todos.length + 1,
        title,
        description,
        status: 'created',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    todos.push(newTodo);

    res.status(201).json(newTodo);
});

//POST
app.get('/todos', (req, res) => {
    res.status(200).json({ todos });
});

//PUT
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) {
        return res.status(404).json({ message: 'TODO gagal di update' });
    }
    todoToUpdate.title = title;
    todoToUpdate.description = description;
    todoToUpdate.updated_at = new Date().toISOString();

    res.status(200).json(todoToUpdate);
});

//PATCH
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) {
        return res.status(404).json({ message: 'Status TODO gagal di ubah' });
    }
    todoToUpdate.status = status;
    todoToUpdate.updated_at = new Date().toISOString();

    res.status(200).json(todoToUpdate);
});

//DELETE
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Tidak ada TODO yang bisa dihapus' });
    }
    const deletedTodo = todos.splice(index, 1)[0];
    res.status(200).json({
        message: `todo dengan id ${deletedTodo.id} dan judul '${deletedTodo.title}' berhasil dihapus`
    });
});

