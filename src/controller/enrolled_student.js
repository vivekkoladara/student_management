const enrolled_student = require("../model/m_enrolled_student");
const { ObjectId } = require("mongodb");

// get all students with all subjects
const getEnrolledStudents = async (req, res) => {
  try {
    const data = await enrolled_student.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $unwind: "$students",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subjects",
        },
      },
      {
        $unwind: "$subjects",
      },
      {
        $group: {
          _id: "$student_id",
          student_name: { $first: "$students.stud_name" },
          subjects: { $push: "$subjects.sub_name" },
        },
      },
      {
        $project: {
          _id: 0,
          student_id: "$_id",
          student_name: 1,
          subjects: 1,
        },
      },
    ]);

    if (!data || data.length < 1) {
      return res.status(200).json({ msg: "No Student Found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get student name and subject individually
const getEnrolledStudentss = async (req, res) => {
  try {
    const data = await enrolled_student.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $unwind: "$students",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
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
          student_name: "$students.stud_name",
          subject_name: "$subjects.sub_name",
        },
      },
    ]);
    if (!data) {
      return res.status(200).json({ msg: "No Student Found With given ID." });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get students by student id
const getEnrolledStudent = async (req, res) => {
  const id = req?.params?.id;
  try {
    const data = await enrolled_student.aggregate([
      {
        $match: {
          student_id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $unwind: "$students",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subjects",
        },
      },
      {
        $unwind: "$subjects",
      },
      {
        $group: {
          _id: "$student_id",
          student_name: { $first: "$students.stud_name" },
          subjects: { $push: "$subjects.sub_name" },
        },
      },
      {
        $project: {
          _id: 1,
          student_id: "$_id",
          student_name: 1,
          subjects: 1,
        },
      },
    ]);
    if (!data) {
      return res.status(200).json({ msg: "No Student Found With given ID." });
    } else {
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get students by enrollment/_id
const getEnrolledStudentt = async (req, res) => {
  const id = req?.params?.id;
  try {
    const data = await enrolled_student.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $unwind: "$students",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subjects",
        },
      },
      {
        $unwind: "$subjects",
      },
      {
        $group: {
          _id: "$student_id",
          student_name: { $first: "$students.stud_name" },
          subjects: { $push: "$subjects.sub_name" },
        },
      },
      {
        $project: {
          _id: 1,
          student_id: "$_id",
          student_name: 1,
          subjects: 1,
        },
      },
    ]);
    if (!data) {
      return res.status(200).json({ msg: "No Student Found With given ID." });
    } else {
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// insert student
const insertStudent = async (req, res) => {
  try {
    const data = new enrolled_student(req.body);
    await data.save();
    return res.status(200).json("New Record Inserted Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update student
// Note:(if you want to update please select id from the database if not understand how get apis work)
const updateStudent = async (req, res) => {
  try {
    const data = req.body;
    await enrolled_student.updateOne({ _id: req?.params?.id }, data);
    return res.status(200).json("Student Updated Successfully...!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete student
const deleteStudent = async (req, res) => {
  try {
    const data = await enrolled_student.deleteOne({ _id: req?.params?.id });
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
  getEnrolledStudents,
  getEnrolledStudentss,
  getEnrolledStudent,
  getEnrolledStudentt,
  insertStudent,
  updateStudent,
  deleteStudent,
};
