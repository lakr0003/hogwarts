import { pool } from "../db.js";

export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM hogwarts_api.houses"); //Vi flytter vores query linje direkte over, uden ændring
  return result.rows; //Og returnerer det færdige resultat
}

export async function getHouseById(id) {
  const one = await pool.query("SELECT * FROM hogwarts_api.houses WHERE id = $1", [id]);
  if (one.rowCount === 0) {
    return null; //return null if no house is found with the given id
  } else {
    return one.rows[0]; //return the first object in the array of rows
  }
}
