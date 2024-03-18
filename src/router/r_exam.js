const express = require("express");
const {
  getExams,
  getExam,
  insertExam,
  updateExam,
  deleteExam,
} = require("../controller/exam");

const student = express.Router();

student.get("/", getExams);
student.get("/:id", getExam);
student.post("/", insertExam);
student.put("/:id", updateExam);
student.delete("/:id", deleteExam);

module.exports = student;
