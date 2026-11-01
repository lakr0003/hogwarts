//const express = require("express");
import express from "express";

//database connection
//const { Pool } = require("pg");
// import { pool } from "./db.js";

// import * as houseRepository from "./repositories/houses.repository.js";
// import * as houseController from "./controllers/houses.controller.js";
import houseRouter from "./routers/houses.router.js";

// import * as teacherRepository from "./repositories/teachers.repository.js";
import * as teacherController from "./controllers/teachers.controller.js";
// import * as studentRepository from "./repositories/students.repository.js";
import * as studentController from "./controllers/students.controller.js";
// import * as courseRepository from "./repositories/courses.repository.js";
import * as courseController from "./controllers/courses.controller.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies   ​

////////////////////////// HOUSES ////////////////////////////////////////////////
app.use("/houses/", houseRouter);
//GET request to all houses
// app.get("/houses", houseController.getAllHouses); //app.js indeholder nu kun kald til controller – intet kode
// houseRouter.get("/houses", houseController.getAllHouses); //app.js indeholder nu kun kald til controller – intet kode

//GET request to one house by id
// app.get("/houses/:id", houseController.getHouseById); //app.js indeholder nu kun kald til controller – intet kode
// houseRouter.get("/houses/:id", houseController.getHouseById); //app.js indeholder nu kun kald til controller – intet kode

// app.get("/houses/:id", async function (req, res) {
//   try {
//     const id = req.params.id; //I controlleren ”fisker” vi id ud af req.params
//     const singleHouse = await houseRepository.getHouseById(id); //sender id videre til repository

//     if (singleHouse) {
//       res.status(200).json(singleHouse); //hvis repository returnerede et objekt så sender vi det som JSON
//     } else {
//       res.sendStatus(404); //hvis repository returnerede null så sender vi 404 Not Found
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Database error" });
//   }
// });

//
//
////////////////////////// TEACHERS ////////////////////////////////////////////////
//GET request to READ teachers
app.get("/teachers", teacherController.getAllTeachers);

//GET request to READ teacher by id
app.get("/teachers/:id", teacherController.getTeacherById);

//PUT request to UPDATE teachers
app.put("/teachers/:id", teacherController.putTeacherById);

//POST request to CREATE teacher
app.post("/teachers", teacherController.postTeacher);

//DELETE request to DELETE a teacher by id
app.delete("/teachers/:id", teacherController.deleteTeacherById);

//
//
////////////////////////// STUDENTS ////////////////////////////////////////////////
//GET request to READ students
app.get("/students", studentController.getAllStudents);

//GET request to READ student by id
app.get("/students/:id", studentController.getStudentById);

//PUT request to UPDATE student
app.put("/students/:id", studentController.putStudentById);

//POST request to CREATE student
app.post("/students", studentController.postStudent);

//DELETE request to DELETE a student by id
app.delete("/students/:id", studentController.deleteStudentById);

//
//
////////////////////////// COURSES ////////////////////////////////////////////////
//GET request to READ all courses
app.get("/courses", courseController.getAllCourses);

//GET request to READ course by id
app.get("/courses/:id", courseController.getCourseById);

//POST request to CREATE a course
app.post("/courses", courseController.postCourse);

//DELETE request to DELETE a course by id
app.delete("/courses/:id", courseController.deleteCourseById);

// UPDATE courses
//PUT request to UPDATE course name
app.put("/courses/:id", courseController.updateCourseNameById);

//PUT request to SET teacher on a course
app.put("/courses/:id/teacher", courseController.updateCourseTeacherById);

//POST request to ADD a student to a course
app.post("/courses/:id/students", courseController.postStudentToCourse);

// DELETE request to REMOVE a student from a course - ikke implememnteret
// app.delete("/courses/:id/students/:student_id", async function (req, res) {
//   const id = req.params.id;
//   try {
//     const deleteStudent = await pool.query(
//       `DELETE FROM hogwarts_api.course_students
//       WHERE id = $1
//       RETURNING id`,
//       [id],
//     );
//     if (deleteStudent.rowCount === 0) {
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(204);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error connecting to database" });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
