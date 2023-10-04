const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.urlencoded());
app.use(express.json());

const port = 3000;

const todos = [];

let id = 1;

const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

app.post("/todos", (req, res) => {
  const { title, description, status } = req.body;
  const newTodo = {
    id: id++,
    title,
    description,
    status,
    created_at: getFormattedDate(),
    updated_at: getFormattedDate(),
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const todoToUpdate = todos.find((todo) => todo.id === parseInt(id));
  if (todoToUpdate) {
    todoToUpdate.title = title;
    todoToUpdate.description = description;
    todoToUpdate.updated_at = getFormattedDate();

    res.status(200).json(todoToUpdate);
  } else {
    res.status(404).json({ message: "Tidak ditemukan" });
  }
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const todoToUpdate = todos.find((todo) => todo.id === parseInt(id));
  if (todoToUpdate) {
    todoToUpdate.status = status;
    todoToUpdate.updated_at = getFormattedDate();
    res.status(200).json(todoToUpdate);
  } else {
    res.status(404).json({ message: "Tidak ditemukan" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    res.status(200).json({
      message: `Todo dengan ID ${id} berhasill didelete`,
      todo: deletedTodo,
    });
  } else {
    res.status(404).json({ message: "Tidak ditemukan" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
