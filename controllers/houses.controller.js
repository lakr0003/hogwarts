import * as houseRepository from "../repositories/houses.repository.js";
import HTTPError from "./../errorhandling/HTTPError.js";
//vi skal huske at importere repositoriet til controlleren!

export const getAllHouses = async function (req, res) {
  // try {
  const allHouses = await houseRepository.getAllHouses(); //Vi kalder funktionen i repositoriet
  res.json(allHouses); //Og sender det, den returnerede, som JSON
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Something went wrong with the database", error: "Internal Server Error", statusCode: 500 });
  // }
};

export const getHouseById = async function (req, res) {
  // try {
  const id = req.params.id; //I controlleren ”fisker” vi id ud af req.params
  const singleHouse = await houseRepository.getHouseById(id); //sender id videre til repository

  if (singleHouse) {
    return res.status(200).json(singleHouse); //hvis repository returnerede et objekt så sender vi det som JSON
  }
  throw new HTTPError(404, "House not found");
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Something went wrong with the database", error: "Internal Server Error", statusCode: 500 });
  // }
  // };
};
