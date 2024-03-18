const mongoose = require("mongoose");

const enrolledStudent_Schema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const enrolledStudent = new mongoose.model(
  "enrolled_student",
  enrolledStudent_Schema
);
module.exports = enrolledStudent;
