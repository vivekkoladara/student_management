const express = require("express");
const {
  getStudents,
  insertStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/student");

const student = express.Router();

student.get("/", getStudents);
student.get("/:id", getStudent);
student.post("/", insertStudent);
student.put("/:id", updateStudent);
student.delete("/:id", deleteStudent);

module.exports = student;
