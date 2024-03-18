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
});

const exam = new mongoose.model("exam", examSchema);
module.exports = exam;
