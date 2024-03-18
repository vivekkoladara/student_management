const express = require("express");

const index = express();

index.use("/admin", require("./r_admin"));

module.exports = index;
