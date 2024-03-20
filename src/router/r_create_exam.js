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
  body("exam_title").notEmpty().withMessage("Please Enter Exam Title"),
  body("sub_id").notEmpty().withMessage("Please Enter Subject Id"),
  body("marks").notEmpty().withMessage("Please Enter Markd"),
  body("exam_date").notEmpty().withMessage("Please Enter Exam Date"),
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

exam.put("/:id", isValidate, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    updateExam(req, res);
  }
});
exam.delete("/:id", deleteExam);

module.exports = exam;
