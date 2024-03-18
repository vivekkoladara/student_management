const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  stud_name: {
    type: String,
    required: true,
  },
  roll_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const student = new mongoose.model("student", studentSchema);
module.exports = student;
