import * as teacherRepository from "../repositories/teachers.repository.js";
import HTTPError from "./../errorhandling/HTTPError.js";

export const getAllTeachers = async function (req, res) {
  // try {
  const allTeachers = await teacherRepository.getAllTeachers();
  res.json(allTeachers);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({ message: "Error connecting to database" });
  //   }
};

export const getTeacherById = async function (req, res) {
  // try {
  const id = req.params.id; //I controlleren ”fisker” vi id ud af req.params
  const singleTeacher = await teacherRepository.getTeacherById(id); //sender id videre til repository

  if (singleTeacher) {
    return res.status(200).json(singleTeacher); //hvis repository returnerede et objekt så sender vi det som JSON
  }
  // } else {
  throw new HTTPError(404, "Teacher not found");

  // res.sendStatus(404); //hvis repository returnerede null så sender vi 404 Not Found
  // }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Database error" });
  // }
};

export const putTeacherById = async function (req, res) {
  // try {
  const id = req.params.id;
  const { name, house_id } = req.body;
  const updTeacher = await teacherRepository.putTeacherById(name, house_id, id);

  if (updTeacher) {
    return res.status(200).json(updTeacher);
  }
  throw new HTTPError(404, "Teacher not found");
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Error connecting to database" });
  // }
};

export const postTeacher = async function (req, res) {
  // try {
  const { name, house_id } = req.body;
  const newTeacher = await teacherRepository.postTeacher(name, house_id);

  res.status(201).json(newTeacher);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Error connecting to database" });
  // }
};

export const deleteTeacherById = async function (req, res) {
  // try {
  const id = req.params.id;
  const deleteTeacher = await teacherRepository.deleteTeacherById(id);

  if (deleteTeacher) {
    return res.sendStatus(204);
  }
  throw new HTTPError(404, "Teacher not found");
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send({ message: "Error connecting to database" });
  // }
};
