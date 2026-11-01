import * as houseRepository from "../repositories/houses.repository.js";
//vi skal huske at importere repositoriet til controlleren!

export const getAllHouses = async function (req, res) {
  try {
    const allHouses = await houseRepository.getAllHouses(); //Vi kalder funktionen i repositoriet
    res.json(allHouses); //Og sender det, den returnerede, som JSON
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
};

export const getHouseById = async function (req, res) {
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
};
