import express from "express";
import * as studentController from "../controllers/students.controller.js";

const studentRouter = express.Router();

//GET request to READ students
studentRouter.get("/", studentController.getAllStudents);

//GET request to READ student by id
studentRouter.get("/:id", studentController.getStudentById);

//PUT request to UPDATE student
studentRouter.put("/:id", studentController.putStudentById);

//POST request to CREATE student
studentRouter.post("/", studentController.postStudent);

//DELETE request to DELETE a student by id
studentRouter.delete("/:id", studentController.deleteStudentById);

export default studentRouter;
