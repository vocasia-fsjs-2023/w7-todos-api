const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Inisialisasi data
let resources = [{
  "id": 1,
  "title": "membuat API",
  "description": "membuat API menggunakan express js dan dilakukan hit menggunakan postman",
  "status": "created",
  "created_at": "2023-09-25",
  "updated_at": "2023-09-25"
}];

// untuk Create (POST)
app.post('/api/resource', (req, res) => {
  const newResource = req.body;
  resources.push(newResource);
  res.status(201).json(newResource);
});

// untuk Read (GET)
app.get('/api/resource', (req, res) => {
  res.json(resources);
});

// untuk Update (PUT)
app.put('/api/resource/:id', (req, res) => {
  const resourceId = parseInt(req.params.id);
  const updatedResource = req.body;

  resources = resources.map(resource => {
    if (resource.id === resourceId) {
      return { ...resource, ...updatedResource, updated_at: getCurrentDateTime() };
    }
    return resource;
  });

  res.json(updatedResource);
});

// Update (PATCH)
app.patch('/api/resource/:id', (req, res) => {
  const resourceId = parseInt(req.params.id);
  const patchedResource = req.body;

  resources = resources.map(resource => {
    if (resource.id === resourceId) {
      return { ...resource, ...patchedResource, updated_at: getCurrentDateTime() };
    }
    return resource;
  });

  res.json(patchedResource);
});

// untuk Delete (DELETE)
app.delete('/api/resource/:id', (req, res) => {
  const resourceId = parseInt(req.params.id);
  resources = resources.filter(resource => resource.id !== resourceId);
  res.json({ message: 'Resource deleted successfully' });
});

function getCurrentDateTime() {
  const now = new Date();
  const isoString = now.toISOString().split('T');
  return ${isoString[0]} ${isoString[1].split('.')[0]};
}

app.listen(port, () => {
  console.log(Server is running on http://localhost:${port});
});
