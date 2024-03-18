const subject = require("../model/m_subject");

const getSubjects = async (req, res) => {
  try {
    const data = await subject.find();
    if (!data || data.length < 1) {
      return res.status(200).json({ msg: "No Subject Found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSubject = async (req, res) => {
  try {
    const data = await subject.findById(req?.params.id);
    if (!data) {
      return res.status(200).json({ msg: "No Subject Found With given ID." });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const insertSubject = async (req, res) => {
  try {
    const data = new subject(req.body);
    await data.save();
    return res.status(200).json("New Subject Inserted Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const data = req.body;
    await subject.updateOne({ _id: req?.params?.id }, data);
    return res.status(200).json("Subject Updated Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const data = await subject.deleteOne({ _id: req?.params?.id });
    if (data.deletedCount > 0) {
      return res.status(200).json("Deleted Successfully...!!");
    } else {
      return res.status(200).json({ msg: "ID not found!!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubject,
  insertSubject,
  updateSubject,
  deleteSubject,
};
