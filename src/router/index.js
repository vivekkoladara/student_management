const express = require("express");

const index = express();

index.use("/student", require("../router/r_student"));
index.use("/subject", require("../router/r_subject"));
index.use("/enrolled_student", require("../router/r_enroller_student"));
index.use("/create_exam", require("../router/r_create_exam"));
index.use("/exam", require("../router/r_exam"));
index.use("/result", require("../router/r_result"));

module.exports = index;
