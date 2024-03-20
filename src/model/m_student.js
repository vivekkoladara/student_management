// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   stud_name: {
//     type: String,
//     required: true,
//   },
//   roll_no: {
//     type: Number,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const student = new mongoose.model("student", studentSchema);
// module.exports = student;
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const studentSchema = new mongoose.Schema({
  stud_name: {
    type: String,
    required: true,
  },
  roll_no: {
    type: Number,
    unique: true, // Ensures roll_no is unique
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Plugin for auto-incrementing roll_no
studentSchema.plugin(AutoIncrement, { inc_field: "roll_no" });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
