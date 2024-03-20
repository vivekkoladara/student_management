const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  obtain_marks: {
    type: Number,
    required: true,
  },
});

const exam = new mongoose.model("exam", examSchema);
module.exports = exam;
