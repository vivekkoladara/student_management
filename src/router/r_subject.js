const express = require("express");
const {
  getSubjects,
  getSubject,
  insertSubject,
  updateSubject,
  deleteSubject,
} = require("../controller/subject");
const { body, validationResult } = require("express-validator");

const subject = express.Router();

const isValidate = [
  body("sub_name")
    .notEmpty()
    .isString()
    .withMessage("Please Enter Subject Name"),
];

subject.get("/", getSubjects);
subject.get("/:id", getSubject);
subject.post("/", isValidate, (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  } else {
    insertSubject(req, res);
  }
});
subject.put("/:id", isValidate, (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  } else {
    updateSubject(req, res);
  }
});
subject.delete("/:id", deleteSubject);

module.exports = subject;
