const express = require("express");
const {
  enterStudent,
  updateExamData,
  getExamData,
} = require("../controller/exam");
const { validationResult, query } = require("express-validator");
const exam = express.Router();

const isValidate = [
  query("exam_id")
    .notEmpty()
    .withMessage("Please Enter Exam Id ")
    .bail()
    .isMongoId()
    .withMessage("Invalid Exam Id"),

  query("subject_id")
    .notEmpty()
    .withMessage("Please Enter Subject Id")
    .bail()
    .isMongoId()
    .withMessage("Invalid Subject Id"),
  query("obtain_marks")
    .notEmpty()
    .withMessage("Please Enter Subject Id")
    .bail()
    .isLength({ min: 1, max: 3 })
    .withMessage("Obtain Marks should be between 1 to 3  digits"),
];

exam.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    enterStudent(req, res);
  }
});

exam.get("/:id", getExamData);
exam.put("/:id", updateExamData);

module.exports = exam;
