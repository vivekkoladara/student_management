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
    const subjectId = req?.query?.subject_id;
    const studentId = FetchUserId(req?.headers["authorization"]);
    const marks = req?.query?.obtain_marks;

    const isValidExamId = await exam_list.find({
      _id: new ObjectId(examId),
    });

    if (isValidExamId.length > 0) {
      const isValidSubjectId = await exam_list.find({
        _id: new ObjectId(examId),
        subject_id: new ObjectId(subjectId),
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
              obtain_marks: marks,
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
        return res
          .status(200)
          .json({ msg: "No Exams  Found For this Subject" });
      }
    } else {
      return res.status(200).json({ msg: "No Exam Found With Given ID" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get exam data by _id
const getExamData = async (req, res) => {
  try {
    const data = await exam.aggregate([
      {
        $match: {
          _id: new ObjectId(req?.params?.id),
        },
      },
      {
        $lookup: {
          from: "exam_lists",
          localField: "exam_id",
          foreignField: "_id",
          as: "exam_details",
        },
      },
      { $unwind: "$exam_details" },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "student_details",
        },
      },
      { $unwind: "$student_details" },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subject_details",
        },
      },
      { $unwind: "$subject_details" },

      {
        $project: {
          _id: 1,
          student_id: "$student_id",
          student_name: "$student_details.stud_name",
          roll_no: "$student_details.roll_no",
          exam_title: "$exam_details.exam_title",
          suject: "$subject_details.sub_name",
          obtain_marks: "$obtain_marks",
          total_marks: "$exam_details.total_marks",
          exam_date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$exam_details.exam_date",
            },
          },
        },
      },
    ]);
    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update exam
const updateExamData = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Please provide fields to update" });
    }
    await exam.updateOne({ _id: req?.params?.id }, data);
    return res.status(200).json("Record Updated Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get exam result
const getExamResult = async (req, res) => {
  try {
    const data = await exam.aggregate([
      {
        $lookup: {
          from: "exam_lists",
          localField: "exam_id",
          foreignField: "_id",
          as: "exam_details",
        },
      },
      { $unwind: "$exam_details" },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "student_details",
        },
      },
      { $unwind: "$student_details" },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subject_details",
        },
      },
      { $unwind: "$subject_details" },

      {
        $project: {
          _id: 1,
          student_id: "$student_id",
          student_name: "$student_details.stud_name",
          roll_no: "$student_details.roll_no",
          exam_title: "$exam_details.exam_title",
          suject: "$subject_details.sub_name",
          obtain_marks: "$obtain_marks",
          total_marks: "$exam_details.total_marks",
          exam_date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$exam_details.exam_date",
            },
          },
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get result by student id
const getResultByID = async (req, res) => {
  try {
    const data = await exam.aggregate([
      {
        $match: {
          student_id: new ObjectId(req?.params?.id),
        },
      },
      {
        $lookup: {
          from: "exam_lists",
          localField: "exam_id",
          foreignField: "_id",
          as: "exam_details",
        },
      },
      { $unwind: "$exam_details" },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "student_details",
        },
      },
      { $unwind: "$student_details" },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subject_details",
        },
      },
      { $unwind: "$subject_details" },

      {
        $project: {
          _id: 0,
          student_id: "$student_id",
          student_name: "$student_details.stud_name",
          roll_no: "$student_details.roll_no",
          exam_title: "$exam_details.exam_title",
          suject: "$subject_details.sub_name",
          obtain_marks: "$obtain_marks",
          total_marks: "$exam_details.total_marks",
          exam_date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$exam_details.exam_date",
            },
          },
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enterStudent,
  getExamData,
  getExamResult,
  getResultByID,
  updateExamData,
};
