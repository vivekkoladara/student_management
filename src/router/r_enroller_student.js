const express = require("express");
const {
  getEnrolledStudents,
  insertStudent,
  getEnrolledStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/enrolled_student");

const student = express.Router();

student.get("/", getEnrolledStudents);
student.get("/:id", getEnrolledStudent);
student.post("/", insertStudent);
student.put("/:id", updateStudent);
student.delete("/:id", deleteStudent);

module.exports = student;
