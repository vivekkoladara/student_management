const express = require("express");
const {
  getStudents,
  insertStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/student");
const { body, validationResult } = require("express-validator");

const student = express.Router();

const isValidate = [
  body("stud_name")
    .notEmpty()
    .withMessage("Please Enter Student Name")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name Must be at least 3 character"),
  body("email")
    .notEmpty()
    .withMessage("Please Enter Email_id")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Format"),
  body("password")
    .notEmpty()
    .withMessage("Please Enter Password")
    .bail()
    .isLength({ min: 3, max: 15 })
    .withMessage("Password Leanth  should be between 8 to 15  digits"),
];

student.get("/", getStudents);
student.get("/:id", getStudent);
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
