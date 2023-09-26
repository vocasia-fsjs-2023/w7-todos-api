# My Todo List

List of available endpoints:

- `POST /todos`
- `GET /todos`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

### POST /todos

description:
create todo to inset it in list

Request:

- body:

```json
{
  "title": "Create POST in TODO App",
  "description": "Membuat API Post Pada Todos app untuk menambahkan todo list"
}
```

Response:

- status: 201
- body:

```json
{
  "id": 1,
  "title": "Create POST in TODO App",
  "description": "Membuat API Post Pada Todos app untuk menambahkan todo list",
  "status": "created",
  "created_at": "2023-09-26",
  "updated_at": "2023-09-26"
}
```

### GET /todos

description:
get all todo list

Response:

- status: 200
- body:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "Create POST in TODO App",
      "description": "Membuat API Post Pada Todos app untuk menambahkan todo list",
      "status": "created",
      "created_at": "2023-09-26",
      "updated_at": "2023-09-26"
    }
  ]
}
```

### PUT /todos/:id

description:
edit single todos data

Request:

- query param:

```json
{
  "id": 1
}
```

- body:

```json
{
  "title": "Create PUT in TODO App",
  "description": "Mengubah todo tentang post menjadi PUT pada TODO App"
}
```

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "title": "Create PUT in TODO App",
  "description": "Mengubah todo tentang post menjadi PUT pada TODO App",
  "status": "created",
  "created_at": "2023-09-26",
  "updated_at": "2023-09-27"
}
```

### PATCH /todos/:id

description:
mengubah status dari satu Todo, dari created, menjadi in_progress, ataupun done

Request:

- query param:

```json
{
  "id": 1
}
```

- body:

```json
{
  "status": "in_progress"
}
```

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "title": "Create PUT in TODO App",
  "description": "Mengubah todo tentang post menjadi PUT pada TODO App",
  "status": "in_progress",
  "created_at": "2023-09-26",
  "updated_at": "2023-09-28"
}
```

### DELETE /todos/:id

description:
menghapus satu todos dari kumpulan todos list

Request:

- query param:

```json
{
  "id": 1
}
```

- body:
  none

Response:

- status: 200
- body:

```json
{
  "message": "todo dengan id 1 dan judul Create PUT in TODO App berhasil dihapus"
}
```
