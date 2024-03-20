const express = require("express");
const dotenv = require("dotenv");
require("./src/helper/db");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/registration", require("./src/router/public_router/r_register"));
app.use("/login", require("./src/router/public_router/r_login"));

app.use("/", require("./src/middleware/auth"), require("./src/router/index"));

module.exports = app;
