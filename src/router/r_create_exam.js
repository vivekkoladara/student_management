const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  getExams,
  getExam,
  insertExam,
  updateExam,
  deleteExam,
} = require("../controller/create_exam");

const exam = express.Router();

// check the field  is not empty or null
const isValidate = [
  body("exam_title")
    .notEmpty()
    .withMessage("Please Enter Exam Title")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Exam Title Must  Be At Least 3 Characters"),
  body("subject_id")
    .notEmpty()
    .withMessage("Please Enter Subject Id")
    .bail()
    .isMongoId()
    .withMessage("Invalid Subject Id"),
  body("marks")
    .notEmpty()
    .withMessage("Please Enter Marks")
    .bail()
    .isLength({ min: 2, max: 3 })
    .withMessage("Marks  must be between 2 to 3 digits"),
  body("exam_date")
    .notEmpty()
    .withMessage("Please Enter Exam Date")
    .bail()
    .isDate()
    .withMessage("Please Enter Valid Date"),
];

exam.get("/", getExams);
exam.get("/:id", getExam);

exam.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    insertExam(req, res);
  }
});

exam.put("/:id", updateExam);
exam.delete("/:id", deleteExam);

module.exports = exam;
