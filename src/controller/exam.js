const exam = require("../model/m_exam");

const getExams = async (req, res) => {
  try {
    const data = await exam.find();
    if (!data || data.length < 1) {
      return res.status(200).json({ msg: "No Exam Found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExam = async (req, res) => {
  try {
    const data = await exam.findById(req?.params.id);
    if (!data) {
      return res.status(200).json({ msg: "No Exam Found With given ID." });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const insertExam = async (req, res) => {
  try {
    const data = new exam(req.body);
    await data.save();
    return res.status(200).json("New Exam Created Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateExam = async (req, res) => {
  try {
    const data = req.body;
    await exam.updateOne({ _id: req?.params?.id }, data);
    return res.status(200).json("Exam Updated Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
