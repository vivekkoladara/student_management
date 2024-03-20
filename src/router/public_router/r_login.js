const express = require("express");

const { Login } = require("../../controller/login");
const { validationResult, query } = require("express-validator");

const login = express.Router();

const isValidate = [
  query("loginString")
    .notEmpty()
    .withMessage("Please Enter Email ")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Format"),

  query("password")
    .notEmpty()
    .withMessage("Please Enter Password")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password Leanth  should be between 8 to 15  digits"),
];

login.get("/", isValidate, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    Login(req, res);
  }
});

module.exports = login;
