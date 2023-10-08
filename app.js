const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const todos = [];

// untuk mencari  ID
function findTodoById(id) {
    return todos.find((todo) => todo.id === id);
}

// untuk menggenerate ID baru
function generateNewId() {
    const maxId = todos.reduce(
        (max, todo) => (todo.id > max ? todo.id : max),
        0
    );
    return maxId + 1;
}

//  untuk mengubah status todo
function updateTodoStatus(todo, newStatus) {
    todo.status = newStatus;
    todo.updated_at = new Date().toISOString();
}

// Create Todo
app.post("/todos", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res
            .status(400)
            .json({ error: "Title and description are required." });
    }

    const newTodo = {
        id: generateNewId(),
        title,
        description,
        status: "created",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// Membaca Todo
app.get("/todos", (req, res) => {
    res.status(200).json({ todos });
});

// Update Todo (PUT)
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    const todoToUpdate = findTodoById(id);

    if (!todoToUpdate) {
        return res.status(404).json({ error: "Todo not found" });
    }

    if (title) {
        todoToUpdate.title = title;
    }

    if (description) {
        todoToUpdate.description = description;
    }

    todoToUpdate.updated_at = new Date().toISOString();

    res.status(200).json(todoToUpdate);
});

//Update Todo(PATCH)
app.patch("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const todoToUpdate = findTodoById(id);

    if (!todoToUpdate) {
        return res.status(404).json({ error: "Todo not found" });
    }

    if (
        status &&
        (status === "created" || status === "in_progress" || status === "done")
    ) {
        updateTodoStatus(todoToUpdate, status);
    } else {
        return res.status(400).json({ error: "Invalid status value" });
    }

    res.status(200).json(todoToUpdate);
});

// Hapus Todo
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }

    const deletedTodo = todos.splice(index, 1)[0];

    res.status(200).json({
        message: `Todo dengan id ${deletedTodo.id} dan judul ${deletedTodo.title} berhasil dihapus`,
    });
});

// Mencari todo dengan ID
app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const todo = findTodoById(id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});