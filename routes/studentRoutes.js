const express = require("express");
const {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");

const router = express.Router();

router.post("/", createStudent);
router.get("/:id", getStudentById);
router.get("/", getAllStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
