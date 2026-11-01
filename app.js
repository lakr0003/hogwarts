//const express = require("express");
import express from "express";

//database connection
//const { Pool } = require("pg");
import { pool } from "./db.js";

import * as houseRepository from "./repositories/houses.repository.js";
import * as teacherRepository from "./repositories/teachers.repository.js";

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
    const house = await houseRepository.getHouseById(id); //sender id videre til repository

    if (house) {
      res.status(200).json(house); //hvis repository returnerede et objekt så sender vi det som JSON
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
  //benytter arrwofunction
  try {
    const id = req.params.id; //I controlleren ”fisker” vi id ud af req.params
    const teacher = await teacherRepository.getTeacherById(id); //sender id videre til repository

    if (teacher) {
      res.status(200).json(teacher); //hvis repository returnerede et objekt så sender vi det som JSON
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
    const teacher = await teacherRepository.putTeacherById(name, house_id, id);

    if (teacher) {
      res.status(200).json(teacher);
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
    // const post = await teacherRepository.postTeacherById(name, house_id);

    const postTeacher = await pool.query(
      `INSERT INTO hogwarts_api.teachers (name, house_id)
      VALUES ($1, $2)
      RETURNING id, name, house_id`,
      [name, house_id],
    );

    res.status(201).json(postTeacher.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//DELETE request to DELETE a teacher by id
app.delete("/teachers/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deleteTeacher = await pool.query(
      `DELETE FROM hogwarts_api.teachers
      WHERE id = $1
      RETURNING id`,
      [id],
    );
    if (deleteTeacher.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
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
    // const allStudents = await teacherRepository.getAllTeachers(); //Vi kalder funktionen i repositoriet
    const allStudents = await pool.query(`SELECT * FROM hogwarts_api.students`);

    // res.json(allStudents); //Og sender det, den returnerede, som JSON
    res.status(200).json(allStudents.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//GET request to READ student by id
app.get("/students/:id", async function (req, res) {
  try {
    const id = req.params.id;
    // const student = await studentRepository.getStudentById(id);
    const student = await pool.query(`SELECT * FROM hogwarts_api.students WHERE id = $1`, [id]);

    // if (student) {
    //   res.status(200).json(student); //hvis repository returnerede et objekt så sender vi det som JSON
    // } else {
    //   res.sendStatus(404); //hvis repository returnerede null så sender vi 404 Not Found
    // }

    if (student.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(student.rows[0]);
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

    // const student = await studentRepository.putStudentById(name, house_id, id);
    const student = await pool.query(
      `UPDATE hogwarts_api.students SET name = $1, house_id = $2, year = $3
      WHERE id = $4
      RETURNING id, name, house_id, year`,
      [name, house_id, year, id],
    );

    // if (student) {
    //   res.status(200).json(student);
    // } else {
    //   res.sendStatus(404);
    // }

    if (student.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(student.rows[0]);
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

    const postStudent = await pool.query(
      `INSERT INTO hogwarts_api.students (name, house_id, year)
      VALUES ($1, $2, $3)
      RETURNING id, name, house_id, year`,
      [name, house_id, year],
    );
    res.status(201).json(postStudent.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//DELETE request to DELETE a student by id
app.delete("/students/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deleteStudent = await pool.query(
      `DELETE FROM hogwarts_api.students
      WHERE id = $1
      RETURNING id`,
      [id],
    );
    if (deleteStudent.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

////////////////////////// COURSES ////////////////////////////////////////////////
//GET request to READ all courses
app.get("/courses", async function (req, res) {
  try {
    const allCourses = await pool.query(`SELECT * FROM hogwarts_api.courses`);

    res.status(200).json(allCourses.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//GET request to READ course by id
app.get("/courses/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const course = await pool.query(`SELECT * FROM hogwarts_api.courses WHERE id = $1`, [id]);

    if (course.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(course.rows[0]);
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

    const postCourse = await pool.query(
      `INSERT INTO hogwarts_api.courses (name, teacher_id)
      VALUES ($1, $2)
      RETURNING id, name, teacher_id`,
      [name, teacher_id],
    );

    res.status(201).json(postCourse.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

//DELETE request to DELETE a course by id
app.delete("/courses/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deleteCourse = await pool.query(
      `DELETE FROM hogwarts_api.courses
      WHERE id = $1
      RETURNING id`,
      [id],
    );
    if (deleteCourse.rowCount === 0) {
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

    const courseName = await pool.query(
      `UPDATE hogwarts_api.courses SET name = $1
      WHERE id = $2
      RETURNING id, name, teacher_id`,
      [name, id],
    );

    if (courseName.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(courseName.rows[0]);
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

    const courseTeacher = await pool.query(
      `UPDATE hogwarts_api.courses SET teacher_id = $1
      WHERE id = $2
      RETURNING id, name, teacher_id`,
      [teacher_id, id],
    );

    if (courseTeacher.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(courseTeacher.rows[0]);
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

    const addStudent = await pool.query(
      `INSERT INTO hogwarts_api.course_students (course_id, student_id)
      VALUES ($1, $2)
      RETURNING course_id, student_id`,
      [id, student_id],
    );

    res.status(201).json(addStudent.rows[0]);
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
