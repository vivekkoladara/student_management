const mongoose = require("mongoose");
const config = require("../config/config");

try {
  mongoose
    .connect(config.DB_URL)
    .then((res) => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
} catch (error) {
  console.log(error);
}
