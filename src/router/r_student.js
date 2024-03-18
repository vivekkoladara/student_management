const express = require("express");
const { getStudents, insertStudent } = require("../controller/student");

const student = express.Router();

student.get("/", getStudents);
student.post("/", insertStudent);

module.exports = student;
