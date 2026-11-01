import express from "express";
import * as houseController from "../controllers/houses.controller.js";
//Vi skal både importere controlleren, og express – fordi vi bruger dens .Router()

const houseRouter = express.Router();

//GET request to all houses
// app.get("/houses", houseController.getAllHouses);
houseRouter.get("/", houseController.getAllHouses);

//GET request to one house by id
// app.get("/houses/:id", houseController.getHouseById);
houseRouter.get("/:id", houseController.getHouseById);

export default houseRouter;
