const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  exam_title: {
    type: String,
    required: true,
  },
  sub_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  exam_date: {
    type: Date,
    required: true,
  },
});

const exam = new mongoose.model("exam_list", examSchema);
module.exports = exam;
