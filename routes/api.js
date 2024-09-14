import express from "express";

const router = express.Router()

import * as tasksController from "../app/controllers/tasksController.js";
import * as usersController from "../app/controllers/usersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

// Users Controller routes
router.post("/Registration", usersController.Registration);
router.post("/Login", usersController.Login);
router.get("/ProfileDetails", AuthMiddleware, usersController.ProfileDetails);
router.post("/ProfileUpdate", AuthMiddleware, usersController.ProfileUpdate);
router.get("/EmailVerification/:email", usersController.EmailVerification);
router.post("/CodeVerification", usersController.CodeVerification);
router.post("/ResetPassword", usersController.ResetPassword);


//Tasks Controller routes
router.post("/CreateTask", AuthMiddleware, tasksController.CreateTask)
router.get("/UpdateTaskStatus/:id/:status", AuthMiddleware, tasksController.UpdateTaskStatus)
router.get("/TaskListByStatus/:status", AuthMiddleware, tasksController.TaskListByStatus)
router.get("/DeleteTask/:id", AuthMiddleware, tasksController.DeleteTask)
router.get("/CountTask", AuthMiddleware, tasksController.CountTask)

export default router;