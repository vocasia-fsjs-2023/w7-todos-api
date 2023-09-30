import express from "express";
import bodyParser from "body-parser";
import todosRouters from "./routes/todos.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/todos", todosRouters);

app.listen(port, () => console.log("Server running on port " + port));
