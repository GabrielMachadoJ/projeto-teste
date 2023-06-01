import express from "express";
import TaskController from "./controller/taskController";
import LoginController from "./controller/loginController";
import CommentController from "./controller/commentController";

const router = express.Router();
const taskController = new TaskController();
const loginController = new LoginController();
const commentController = new CommentController();

router.post("/login", loginController.auth);
router.post("/comment", commentController.create);
router.post("/comment/:id", commentController.update);
router.get("/comment/:id", commentController.getById);
router.get("/comment/task/:taskId", commentController.getByTask);
router.post("/task", taskController.create);
router.get("/task", taskController.get);
router.get("/task/:id", taskController.getById);
router.post("/task/:id", taskController.take);
router.get("/task/conclude/:id", taskController.conclude);

export default router;
