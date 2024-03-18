const express = require("express");
const dotenv = require("dotenv");
require("./src/helper/db");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/student", require("./src/router/r_student"));
app.use("/subject", require("./src/router/r_subject"));

module.exports = app;
