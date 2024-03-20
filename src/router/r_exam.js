const express = require("express");
const { enterStudent } = require("../controller/exam");
const { validationResult, query } = require("express-validator");
const exam = express.Router();

const isValidate = [
  query("exam_id")
    .notEmpty()
    .withMessage("Please Enter Exam Id ")
    .bail()
    .isMongoId()
    .withMessage("Invalid Id"),

  query("subject_id")
    .notEmpty()
    .withMessage("Please Enter Subject Id")
    .bail()
    .isMongoId()
    .withMessage("Invalid Id"),
];

exam.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    enterStudent(req, res);
  }
});

module.exports = exam;
