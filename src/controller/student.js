const student = require("../model/m_student");

const getStudents = async (req, res) => {
  try {
    const data = await student.find();
    if (!data || data.length < 1) {
      return res.status(200).json({ msg: "No Student Found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const data = await student.findById(req?.params.id);
    if (!data) {
      return res.status(200).json({ msg: "No Student Found With given ID." });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const insertStudent = async (req, res) => {
  try {
    const data = new student(req.body);
    await data.save();
    return res.status(200).json("New Student Inserted Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = req.body;
    await student.updateOne({ _id: req?.params?.id }, data);
    return res.status(200).json("Student Updated Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const data = await student.deleteOne({ _id: req?.params?.id });
    if (data.deletedCount > 0) {
      return res.status(200).json("Student Deleted Successfully...!!");
    } else {
      return res.status(200).json({ msg: "ID not found!!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  insertStudent,
  updateStudent,
  deleteStudent,
};
