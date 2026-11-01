import * as courseRepository from "../repositories/courses.repository.js";

//GET request to READ all courses
export const getAllCourses = async function (req, res) {
  try {
    const allCourses = await courseRepository.getAllCourses();
    res.json(allCourses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
};

//GET request to READ course by id
export const getCourseById = async function (req, res) {
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
    res.status(500).send({ message: "Error connecting to database" });
  }
};

//POST request to CREATE a course
export const postCourse = async function (req, res) {
  try {
    const { name, teacher_id } = req.body;
    const newCourse = await courseRepository.postCourse(name, teacher_id);

    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
};

//DELETE request to DELETE a course by id
export const deleteCourseById = async function (req, res) {
  try {
    const id = req.params.id;
    const deleteCourse = await courseRepository.deleteCourseById(id);

    if (deleteCourse) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
};

// UPDATE courses
//PUT request to UPDATE course name
export const updateCourseNameById = async function (req, res) {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const updCourse = await courseRepository.updateCourseNameById(name, id);

    if (updCourse) {
      res.status(200).json(updCourse);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
};

//PUT request to SET teacher on a course
export const updateCourseTeacherById = async function (req, res) {
  try {
    const id = req.params.id;
    const { teacher_id } = req.body;
    const updCourse = await courseRepository.updateCourseTeacherById(teacher_id, id);

    if (updCourse) {
      res.status(200).json(updCourse);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
};

//POST request to ADD a student to a course
export const postStudentToCourse = async function (req, res) {
  try {
    const id = req.params.id;
    const { student_id } = req.body;
    const addStudent = await courseRepository.postStudentToCourse(id, student_id);

    res.status(201).json(addStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
};
