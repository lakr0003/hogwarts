import * as studentRepository from "../repositories/students.repository.js";
import HTTPError from "./../errorhandling/HTTPError.js";

export const getAllStudents = async function (req, res) {
  // try {
  const allStudents = await studentRepository.getAllStudents();
  res.json(allStudents);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Error connecting to database" });
  // }
};

export const getStudentById = async function (req, res) {
  // try {
  const id = req.params.id; // I controlleren "fisker" vi id ud af req.params
  const singleStudent = await studentRepository.getStudentById(id); // sender id videre til repository

  if (singleStudent) {
    return res.status(200).json(singleStudent); // repository returnerede et objekt, så vi sender det som JSON
  }
  throw new HTTPError(404, "Student not found");

  //else {
  //   res.sendStatus(404); // repository returnerede null, så vi sender 404 Not Found
  // }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Database error" });
  // }
};

export const putStudentById = async function (req, res) {
  // try {
  const id = req.params.id;
  const { name, house_id, year } = req.body;
  const updStudent = await studentRepository.putStudentById(name, house_id, year, id);

  if (updStudent) {
    return res.status(200).json(updStudent);
  }
  throw new HTTPError(404, "Student not found");

  // else {
  //   res.sendStatus(404);
  // }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Error connecting to database" });
  // }
};

export const postStudent = async function (req, res) {
  // try {
  const { name, house_id, year } = req.body;
  const newStudent = await studentRepository.postStudent(name, house_id, year);

  res.status(201).json(newStudent);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Error connecting to database" });
  // }
};

export const deleteStudentById = async function (req, res) {
  // try {
  const id = req.params.id;
  const deleteStudent = await studentRepository.deleteStudentById(id);

  if (deleteStudent) {
    return res.sendStatus(204);
  }
  throw new HTTPError(404, "Student not found");

  // else {
  //   res.sendStatus(404);
  // }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Error connecting to database" });
  // }
};
