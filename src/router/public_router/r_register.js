const express = require("express");
const { insertStudent } = require("../../controller/student");

const student = express.Router();

student.post("/", insertStudent);

module.exports = student;
