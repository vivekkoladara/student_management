const express = require("express");
const dotenv = require("dotenv");
const { default: rateLimit } = require("express-rate-limit");
require("./src/helper/db");
dotenv.config();

const app = express();

app.use(express.json());

//  Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

app.use(limiter);

app.use("/registration", require("./src/router/public_router/r_register"));
app.use("/login", require("./src/router/public_router/r_login"));

app.use("/", require("./src/middleware/auth"), require("./src/router/index"));

module.exports = app;
