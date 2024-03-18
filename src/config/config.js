const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;

module.exports = {
  DB_URL,
};
