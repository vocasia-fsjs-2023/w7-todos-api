import { Router } from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  progressTodo,
  updateTodo,
} from "../controllers/todos.js";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id", progressTodo);
router.delete("/:id", deleteTodo);

export default router;
