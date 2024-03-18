const express = require("express");
const dotenv = require("dotenv");
require("./src/helper/db");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/student", require("./src/router/r_student"));

module.exports = app;
