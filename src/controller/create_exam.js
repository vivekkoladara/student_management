const exam = require("../model/m_create_exam");
const { ObjectId } = require("mongodb");

//get all exams
const getExams = async (req, res) => {
  try {
    const data = await exam.aggregate([
      {
        $lookup: {
          from: "subjects",
          localField: "sub_id",
          foreignField: "_id",
          as: "subjects",
        },
      },
      {
        $unwind: "$subjects",
      },
      {
        $project: {
          _id: 1,
          exam_title: 1,
          marks: 1,
          subject_name: "$subjects.sub_name",
          exam_date: 1,
        },
      },
    ]);
    if (!data || data.length === 0) {
      return res.status(200).json({ msg: "No Exam Found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get exams by exam_id/_id
const getExam = async (req, res) => {
  try {
    const id = req?.params?.id;
    const data = await exam.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "sub_id",
          foreignField: "_id",
          as: "subjects",
        },
      },
      {
        $unwind: "$subjects",
      },
      {
        $project: {
          _id: 1,
          exam_title: 1,
          marks: 1,
          subject_name: "$subjects.sub_name",
          exam_date: 1,
        },
      },
    ]);
    if (data.length === 0) {
      return res.status(404).json({ msg: "No Exam Found With Given ID" });
    } else {
      console.log("data =>", data[0]);
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create new exam
const insertExam = async (req, res) => {
  try {
    const data = new exam(req.body);
    await data.save();
    return res.status(200).json("New Exam Created Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update exam usign  _id
const updateExam = async (req, res) => {
  try {
    const data = req.body;
    await exam.updateOne({ _id: req?.params?.id }, data);
    return res.status(200).json("Exam Updated Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete the exam using _id
const deleteExam = async (req, res) => {
  try {
    const data = await exam.deleteOne({ _id: req?.params?.id });
    if (data.deletedCount > 0) {
      return res.status(200).json("Exam Deleted Successfully...!!");
    } else {
      return res.status(200).json({ msg: "ID not found!!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExams,
  getExam,
  insertExam,
  updateExam,
  deleteExam,
};
