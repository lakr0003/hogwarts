import express from "express";
import * as courseController from "../controllers/courses.controller.js";

const courseRouter = express.Router();

//GET request to READ all courses
courseRouter.get("/", courseController.getAllCourses);

//GET request to READ course by id
courseRouter.get("/:id", courseController.getCourseById);

//POST request to CREATE a course
courseRouter.post("/", courseController.postCourse);

//DELETE request to DELETE a course by id
courseRouter.delete("/:id", courseController.deleteCourseById);

// UPDATE courses
//PUT request to UPDATE course name
courseRouter.put("/:id", courseController.updateCourseNameById);

//PUT request to SET teacher on a course
courseRouter.put("/:id/teacher", courseController.updateCourseTeacherById);

//POST request to ADD a student to a course
courseRouter.post("/:id/students", courseController.postStudentToCourse);

export default courseRouter;
