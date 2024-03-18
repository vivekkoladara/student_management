const student = require("../model/m_student");

const getStudents = async (req, res) => {
  try {
    const data = await student.find();
    if (!data) {
      return res.status(200).json({ msg: "No Student Found" });
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
    const result = await data.save();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getStudents, insertStudent };
