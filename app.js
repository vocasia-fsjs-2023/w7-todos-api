const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const todos = [];

// Create todo
app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  const id = todos.length + 1;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newTodo = {
    id,
    title,
    description,
    status: "created",
    created_at: createdAt,
    updated_at: updatedAt,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// menampilkan semua data todo
app.get("/todos", (req, res) => {
  res.status(200).json({ todos });
});

//update data todo menggunakan put
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    todos[index].title = title;
    todos[index].description = description;
    todos[index].updated_at = new Date().toISOString();

    res.status(200).json(todos[index]);
  }
});

// Update status todos menggunakann patch
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    todos[index].status = status;
    todos[index].updated_at = new Date().toISOString();

    res.status(200).json(todos[index]);
  }
});

// menghapus data todos
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    const deletedTodo = todos.splice(index, 1);
    res.status(200).json({
      message: `todo dengan id ${id} dan judul ${deletedTodo[0].title} berhasil dihapus`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
