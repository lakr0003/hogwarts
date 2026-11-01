//const express = require("express");
import express from "express";

//database connection
//const { Pool } = require("pg");
import { pool } from "./db.js";

import * as houseRepository from "./repositories/houses.repository.js";
import * as teacherRepository from "./repositories/teachers.repository.js";
import * as studentRepository from "./repositories/students.repository.js";
import * as courseRepository from "./repositories/courses.repository.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies   ​

////////////////////////// HOUSES ////////////////////////////////////////////////
//GET request to all houses
app.get("/houses", async function (req, res) {
  try {
    const allHouses = await houseRepository.getAllHouses(); //Vi kalder funktionen i repositoriet
    res.json(allHouses); //Og sender det, den returnerede, som JSON
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//GET request to one house by id
app.get("/houses/:id", async function (req, res) {
  try {
    const id = req.params.id; //I controlleren ”fisker” vi id ud af req.params
    const singleHouse = await houseRepository.getHouseById(id); //sender id videre til repository

    if (singleHouse) {
      res.status(200).json(singleHouse); //hvis repository returnerede et objekt så sender vi det som JSON
    } else {
      res.sendStatus(404); //hvis repository returnerede null så sender vi 404 Not Found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Database error" });
  }
});

////////////////////////// TEACHERS ////////////////////////////////////////////////
//GET request to READ teachers
app.get("/teachers", async function (req, res) {
  try {
    const allTeachers = await teacherRepository.getAllTeachers(); //Vi kalder funktionen i repositoriet
    res.json(allTeachers); //Og sender det, den returnerede, som JSON
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//GET request to READ teacher by id
app.get("/teachers/:id", async function (req, res) {
  try {
    const id = req.params.id; //I controlleren ”fisker” vi id ud af req.params
    const singleTeacher = await teacherRepository.getTeacherById(id); //sender id videre til repository

    if (singleTeacher) {
      res.status(200).json(singleTeacher); //hvis repository returnerede et objekt så sender vi det som JSON
    } else {
      res.sendStatus(404); //hvis repository returnerede null så sender vi 404 Not Found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Database error" });
  }
});

//PUT request to UPDATE teachers
app.put("/teachers/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const { name, house_id } = req.body;
    const updTeacher = await teacherRepository.putTeacherById(name, house_id, id);

    if (updTeacher) {
      res.status(200).json(updTeacher);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//POST request to CREATE teacher
app.post("/teachers", async function (req, res) {
  try {
    const { name, house_id } = req.body;
    const postTeacher = await teacherRepository.postTeacher(name, house_id);

    res.status(201).json(postTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//DELETE request to DELETE a teacher by id
app.delete("/teachers/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deleteTeacher = await teacherRepository.deleteTeacherById(id);

    if (deleteTeacher) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

////////////////////////// STUDENTS ////////////////////////////////////////////////
//GET request to READ students
app.get("/students", async function (req, res) {
  try {
    const allStudents = await studentRepository.getAllStudents(); //Vi kalder funktionen i repositoriet
    res.json(allStudents); //Og sender det, den returnerede, som JSON
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//GET request to READ student by id
app.get("/students/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const singleStudent = await studentRepository.getStudentById(id);

    if (singleStudent) {
      res.status(200).json(singleStudent); //hvis repository returnerede et objekt så sender vi det som JSON
    } else {
      res.sendStatus(404); //hvis repository returnerede null så sender vi 404 Not Found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Database error" });
  }
});

//PUT request to UPDATE student
app.put("/students/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const { name, house_id, year } = req.body;

    const updStudent = await studentRepository.putStudentById(name, house_id, year, id);

    if (updStudent) {
      res.status(200).json(updStudent);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//POST request to CREATE student
app.post("/students", async function (req, res) {
  try {
    const { name, house_id, year } = req.body;
    const postStudent = await studentRepository.postStudent(name, house_id, year);

    res.status(201).json(postStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//DELETE request to DELETE a student by id
app.delete("/students/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deleteStudent = await studentRepository.deleteStudentById(id);

    if (deleteStudent) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

////////////////////////// COURSES ////////////////////////////////////////////////
//GET request to READ all courses
app.get("/courses", async function (req, res) {
  try {
    const allCourses = await courseRepository.getAllCourses();
    res.json(allCourses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//GET request to READ course by id
app.get("/courses/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const singleCourse = await courseRepository.getCourseById(id);

    if (singleCourse) {
      res.status(200).json(singleCourse);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Database error" });
  }
});

//POST request to CREATE a course
app.post("/courses", async function (req, res) {
  try {
    const { name, teacher_id } = req.body;
    const postCourse = await courseRepository.postCourse(name, teacher_id);

    res.status(201).json(postCourse);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//DELETE request to DELETE a course by id
app.delete("/courses/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deleteCourse = await courseRepository.deleteCourseById(id);

    if (deleteCourse) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

// UPDATE courses
//PUT request to UPDATE course name
app.put("/courses/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const courseName = await courseRepository.updateCourseNameById(name, id);

    if (courseName) {
      res.status(200).json(courseName);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//PUT request to SET teacher on a course
app.put("/courses/:id/teacher", async function (req, res) {
  try {
    const id = req.params.id;
    const { teacher_id } = req.body;
    const courseTeacher = await courseRepository.updateCourseTeacherById(teacher_id, id);

    if (courseTeacher) {
      res.status(200).json(courseTeacher);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//POST request to ADD a student to a course
app.post("/courses/:id/students", async function (req, res) {
  try {
    const id = req.params.id;
    const { student_id } = req.body;
    const addStudent = await courseRepository.postStudentToCourse(id, student_id);

    res.status(201).json(addStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

// DELETE request to REMOVE a student from a course
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
