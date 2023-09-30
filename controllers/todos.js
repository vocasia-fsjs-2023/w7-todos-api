let todos = [];

class Todo {
  constructor(id, title, description, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.created_at = this.createDateStamp();
    this.updated_at = this.createDateStamp();
  }

  createDateStamp() {
    const date = new Date();
    return `${date.getFullYear()}-${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  }

  update(title, description) {
    this.updated_at = this.createDateStamp();
    this.title = title;
    this.description = description;
  }

  progress(status) {
    this.status = status;
  }
}

export const createTodo = (req, res) => {
  const { title, description } = req.body;
  const id = todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 1;
  const todo = new Todo(id, title, description, "created");
  todos.push(todo);

  return res.status(201).json({ todo });
};

export const getTodos = (req, res) => {
  return res.status(200).json({ todos });
};

export const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (todo) {
    todo.update(title, description);
    return res.status(200).json({ todo });
  }

  return res.status(404).json({ message: "Todo not found!" });
};

export const progressTodo = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (todo) {
    todo.progress(status);
    return res.status(200).json({ todo });
  }

  return res.status(404).json({ message: "Todo not found!" });
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res
      .status(404)
      .json({ message: `Todo dengan id ${id} tidak ditemukan` });
  }

  todos = todos.filter((todo) => todo.id !== parseInt(id));

  return res.status(200).json({
    message: `Todo dengan id ${id} dan judul ${todo.title} in Todo App berhasil dihapus`,
  });
};
