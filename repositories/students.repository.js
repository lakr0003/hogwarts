import { pool } from "../db.js";

//GET request to READ all students
export async function getAllStudents() {
  const all = await pool.query("SELECT * FROM hogwarts_api.students");
  return all.rows;
}

//GET request to READ student by id
export async function getStudentById(id) {
  const one = await pool.query("SELECT * FROM hogwarts_api.students WHERE id = $1", [id]);
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}

//PUT request to UPDATE a student
export async function putStudentById(name, house_id, year, id) {
  const upd = await pool.query(
    `UPDATE hogwarts_api.students SET name = $1, house_id = $2, year = $3
      WHERE id = $4
      RETURNING id, name, house_id, year`,
    [name, house_id, year, id],
  );
  if (upd.rowCount === 0) {
    return null;
  } else {
    return upd.rows[0];
  }
}

//POST request to CREATE a student
export async function postStudent(name, house_id, year) {
  const post = await pool.query(
    `INSERT INTO hogwarts_api.students (name, house_id, year)
      VALUES ($1, $2, $3)
      RETURNING id, name, house_id, year`,
    [name, house_id, year],
  );
  return post.rows[0];
}

//DELETE request to DELETE a student
export async function deleteStudentById(id) {
  const del = await pool.query(
    `DELETE FROM hogwarts_api.students
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
