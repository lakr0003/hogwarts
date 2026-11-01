//const express = require("express");
import express from "express";

//database connection
//const { Pool } = require("pg");
// import { pool } from "./db.js";

// import * as houseRepository from "./repositories/houses.repository.js";
// import * as houseController from "./controllers/houses.controller.js";
import houseRouter from "./routers/houses.router.js";

// import * as teacherRepository from "./repositories/teachers.repository.js";
// import * as teacherController from "./controllers/teachers.controller.js";
import teacherRouter from "./routers/teachers.router.js";

// import * as studentRepository from "./repositories/students.repository.js";
// import * as studentController from "./controllers/students.controller.js";
import studentRouter from "./routers/students.router.js";

// import * as courseRepository from "./repositories/courses.repository.js";
// import * as courseController from "./controllers/courses.controller.js";
import courseRouter from "./routers/courses.router.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies   ​

////////////////////////// HOUSES ////////////////////////////////////////////////
app.use("/houses/", houseRouter);

////////////////////////// TEACHERS ////////////////////////////////////////////////
app.use("/teachers/", teacherRouter);

////////////////////////// STUDENTS ////////////////////////////////////////////////
app.use("/students/", studentRouter);

////////////////////////// COURSES ////////////////////////////////////////////////
app.use("/courses/", courseRouter);

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
