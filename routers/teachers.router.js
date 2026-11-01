import express from "express";
import * as teacherController from "../controllers/teachers.controller.js";
//Vi skal både importere controlleren, og express – fordi vi bruger dens .Router()

const teacherRouter = express.Router();

//GET request to READ teachers
teacherRouter.get("/", teacherController.getAllTeachers);

//GET request to READ teacher by id
teacherRouter.get("/:id", teacherController.getTeacherById);

//PUT request to UPDATE teachers
teacherRouter.put("/:id", teacherController.putTeacherById);

//POST request to CREATE teacher
teacherRouter.post("/", teacherController.postTeacher);

//DELETE request to DELETE a teacher by id
teacherRouter.delete("/:id", teacherController.deleteTeacherById);

export default teacherRouter;
