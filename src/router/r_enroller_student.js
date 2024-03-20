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
const { body, validationResult } = require("express-validator");

const student = express.Router();
const isValidate = [
  body("student_id")
    .notEmpty()
    .withMessage("Please Enter Student Id")
    .bail()
    .isMongoId()
    .withMessage("Please Enter Valid ID"),
  body("subject_id")
    .notEmpty()
    .withMessage("Please Enter Subject Id")
    .bail()
    .isMongoId()
    .withMessage("Please Enter Valid ID"),
];
student.get("/", getEnrolledStudents);

//get student name and subject individually
student.get("/individually", getEnrolledStudentss);
student.get("/individually/:id", getEnrolledStudentt);
student.get("/:id", getEnrolledStudent);
student.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    insertStudent(req, res);
  }
});
student.put("/:id", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    updateStudent(req, res);
  }
});
student.delete("/:id", deleteStudent);

module.exports = student;
