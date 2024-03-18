const express = require("express");
const {
  getEnrolledStudents,
  getEnrolledStudentss,
  getEnrolledStudent,
  getEnrolledStudentt,
  insertStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/enrolled_student");

const student = express.Router();

student.get("/", getEnrolledStudents);
//get student name and subject individually
student.get("/individually", getEnrolledStudentss);
student.get("/individually/:id", getEnrolledStudentt);
student.get("/:id", getEnrolledStudent);
student.post("/", insertStudent);
student.put("/:id", updateStudent);
student.delete("/:id", deleteStudent);

module.exports = student;
