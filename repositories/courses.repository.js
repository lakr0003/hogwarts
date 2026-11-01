import { pool } from "../db.js";

//GET request to READ all courses
export async function getAllCourses() {
  const all = await pool.query("SELECT * FROM hogwarts_api.courses");
  return all.rows;
}

//GET request to READ course by id
export async function getCourseById(id) {
  const one = await pool.query("SELECT * FROM hogwarts_api.courses WHERE id = $1", [id]);
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}

//POST request to CREATE a course
export async function postCourse(name, teacher_id) {
  const post = await pool.query(
    `INSERT INTO hogwarts_api.courses (name, teacher_id)
      VALUES ($1, $2)
      RETURNING id, name, teacher_id`,
    [name, teacher_id],
  );
  return post.rows[0];
}

//DELETE request to DELETE a student
export async function deleteCourseById(id) {
  const del = await pool.query(
    `DELETE FROM hogwarts_api.courses
      WHERE id = $1
      RETURNING id`,
    [id],
  );
  if (del.rowCount === 0) {
    return null;
  } else {
    return del.rows[0];
  }
}

// UPDATE COURSES
//PUT request to UPDATE a course name
export async function updateCourseNameById(name, id) {
  const updName = await pool.query(
    `UPDATE hogwarts_api.courses SET name = $1
      WHERE id = $2
      RETURNING id, name, teacher_id`,
    [name, id],
  );
  if (updName.rowCount === 0) {
    return null;
  } else {
    return updName.rows[0];
  }
}

//PUT request to SET teacher on a course
export async function updateCourseTeacherById(teacher_id, id) {
  const updTeacher = await pool.query(
    `UPDATE hogwarts_api.courses SET teacher_id = $1
      WHERE id = $2
      RETURNING id, name, teacher_id`,
    [teacher_id, id],
  );
  if (updTeacher.rowCount === 0) {
    return null;
  } else {
    return updTeacher.rows[0];
  }
}

//POST request to ADD a student to a course
export async function postStudentToCourse(id, student_id) {
  const post = await pool.query(
    `INSERT INTO hogwarts_api.course_students (course_id, student_id)
      VALUES ($1, $2)
      RETURNING course_id, student_id`,
    [id, student_id],
  );
  return post.rows[0];
}
