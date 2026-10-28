//const express = require("express");
import express from "express";

//database connection
//const { Pool } = require("pg");
import { pool } from "./db.js";

import * as houseRepository from "./repositories/houses.repository.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies   ​

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
app.get("/houses/:id", async (req, res) => {
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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//put request to update teachers
app.put("/teachers/:id", async function (req, res) {
  console.log(req.params.id);
  try {
    const { name, house } = req.body;
    const upd = await pool.query(
      `UPDATE one_to_many.members SET name = $1, house = $2
      WHERE id = $3
      RETURNING id, name, house`,
      [name, house, req.params.id],
    );

    if (upd.rowCount === 0) {
      return res.status(404).json({
        error: "Teacher not found",
      });
    }

    res.status(200).send(upd.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
