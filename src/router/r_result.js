const express = require("express");
const { getExamResult, getResultByID } = require("../controller/exam");

const result = express.Router();

result.get("/", getExamResult);
result.get("/:id", getResultByID);

module.exports = result;
