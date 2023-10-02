const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const array = [
  {
    id: 1,
    title: "membuat API",
    description: "membuat API menggunakan express js dan dilakukan hit menggunakan psotman",
    status: "created",
    created_at: "2023-09-25",
    updated_at: "2023-09-25"
  }
];

// Generate ID untuk post selanjutnya
let nextPostId = array.length + 1;

// Create (POST)
app.post('/api/posts', (req, res) => {
  const { title, description, status, created_at, updated_at } = req.body;
  const newPost = {
    id: nextPostId,
    title,
    description,
    status,
    created_at,
    updated_at
  };
  array.push(newPost);
  nextPostId++;
  res.status(201).json(newPost);
});

// Read (GET)
app.get('/api/posts', (req, res) => {
  res.json(array);
});

// Update (PUT)
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, description, status, created_at, updated_at } = req.body;
  const postToUpdate = array.find(post => post.id === postId);
  if (!postToUpdate) {
    return res.status(404).json({ error: 'Post not found' });
  }
  postToUpdate.title = title;
  postToUpdate.description = description;
  postToUpdate.status = status;
  postToUpdate.created_at = created_at;
  postToUpdate.updated_at = updated_at;
  res.json(postToUpdate);
});

// Update (PATCH)
app.patch('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const updates = req.body;
  const postToUpdate = array.find(post => post.id === postId);
  if (!postToUpdate) {
    return res.status(404).json({ error: 'Post not found' });
  }
  Object.assign(postToUpdate, updates);
  res.json(postToUpdate);
});

// Delete (DELETE)
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const index = array.findIndex(post => post.id === postId);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  array.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
