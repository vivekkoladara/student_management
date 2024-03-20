const exam = require("../model/m_exam");
const exam_list = require("../model/m_create_exam");
const { ObjectId } = require("mongodb");
const subject = require("../model/m_subject");
const { FetchUserId } = require("./decodedToken");
const enrolled_student = require("../model/m_enrolled_student");

//enter student_id,exam_id,subject_id into exam
const enterStudent = async (req, res) => {
  try {
    const examId = req?.query?.exam_id;
    const studentId = FetchUserId(req?.headers["authorization"]);
    const subjectId = req?.query?.subject_id;

    const isValidExamId = await exam_list.find({
      _id: new ObjectId(examId),
    });

    if (isValidExamId.length > 0) {
      const isValidSubjectId = await subject.find({
        _id: new ObjectId(subjectId),
      });

      if (isValidSubjectId.length > 0) {
        const isEnroll = await enrolled_student.find({
          student_id: new ObjectId(studentId),
          subject_id: new ObjectId(subjectId),
        });
        if (isEnroll.length > 0) {
          const isGivenExam = await exam.find({
            exam_id: new ObjectId(examId),
            student_id: new ObjectId(studentId),
            subject_id: new ObjectId(subjectId),
          });

          if (isGivenExam.length > 0) {
            return res.status(200).json({ msg: "You have given the exam" });
          } else {
            const newExam = new exam({
              exam_id: examId,
              student_id: studentId,
              subject_id: subjectId,
            });
            await newExam.save();
            return res.status(200).json("Exam Completed...!!");
          }
        } else {
          return res
            .status(200)
            .json({ msg: "You Are Not Enroll With This Subject" });
        }
      } else {
        return res.status(200).json({ msg: "No Subject Found With Given ID" });
      }
    } else {
      return res.status(200).json({ msg: "No Exam Found With Given ID" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { enterStudent };
