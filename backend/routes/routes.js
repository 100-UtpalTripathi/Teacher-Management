import express from "express";
import {
  getAllTeachersController,
  addTeacherController,
  filterTeacherController,
  searchTeacherController,
  updateTeacherController,
  deleteTeacherController,
  findByIdController,
} from "../controllers/controller.js";

const router = express.Router();

// Route for getting all teacher
router.get("/teachers", getAllTeachersController);

// Route for adding a new teacher
router.post("/teachers/add", addTeacherController);

// Route for filtering the teachers
router.get("/teachers/filter", filterTeacherController);

// Route for searching the teachers based on the name
router.get("/teachers/search", searchTeacherController);

// Route for updating an teacher record
router.put("/teachers/update/:id", updateTeacherController);

// Route for deleting an teacher
router.delete("/teachers/delete/:id", deleteTeacherController);

//Route for finding the record by id
router.get("/teachers/findById/:id", findByIdController)
export default router;