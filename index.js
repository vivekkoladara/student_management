const express = require("express");
const dotenv = require("dotenv");
require("./src/helper/db");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/student", require("./src/router/r_student"));
app.use("/subject", require("./src/router/r_subject"));
app.use("/enrolled_student", require("./src/router/r_enroller_student"));
app.use("/exam", require("./src/router/r_exam"));

app.use("/registration", require("./src/router/public_router/r_register"));

module.exports = app;
