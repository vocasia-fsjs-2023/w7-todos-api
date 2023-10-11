const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Data sementara (gunakan database di produksi)
let items = [{ id: 1, title: "Data 1", description: "First Todos" }];

// Operasi CRUD

// Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Get a specific item by ID
app.get("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// Create a new item
app.post("/api/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  items.push(newItem);
  res.json(newItem);
});

// Update an item by ID
app.put("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  } else {
    item.title = req.body.title;
    item.description = req.body.description;
    res.json(item);
    return res.status(200).json({ message: "updated" });
  }
});

// Delete an item by ID
app.delete("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter((i) => i.id !== itemId);

  res.json({ message: "Item deleted successfully" });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
