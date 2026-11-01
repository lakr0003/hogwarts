import { pool } from "../db.js";

//GET request to READ teachers
export async function getAllTeachers() {
  const result = await pool.query("SELECT * FROM hogwarts_api.teachers"); //Vi flytter vores query linje direkte over, uden ændring
  return result.rows; //Og returnerer det færdige resultat
}

//GET request to READ teacher by id
export async function getTeacherById(id) {
  const one = await pool.query("SELECT * FROM hogwarts_api.teachers WHERE id = $1", [id]);
  if (one.rowCount === 0) {
    return null; //return null if no house is found with the given id
  } else {
    return one.rows[0]; //return the first object in the array of rows
  }
}

//PUT request to UPDATE teachers
export async function putTeacherById(name, house_id, id) {
  const upd = await pool.query(
    //send denne sql til databasen (pool=database query=enfunktion på pool)
    `UPDATE hogwarts_api.teachers SET name = $1, house_id = $2
      WHERE id = $3
      RETURNING id, name, house_id`,
    [name, house_id, id],
  );
  if (upd.rowCount === 0) {
    return null;
  } else {
    return upd.rows[0];
  }
}

//POST request to CREATE teacher
export async function postTeacher(name, house_id) {
  const post = await pool.query(
    `INSERT INTO hogwarts_api.teachers (name, house_id)
      VALUES ($1, $2)
      RETURNING id, name, house_id`,
    [name, house_id],
  );
  return post.rows[0];
}

//DELETE request to DELETE teachers
export async function deleteTeacherById(id) {
  const del = await pool.query(
    `DELETE FROM hogwarts_api.teachers
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
