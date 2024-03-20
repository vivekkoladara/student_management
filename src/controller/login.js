const student = require("../model/m_student");
const Jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const email_id = req.query.loginString;
    const password = req.query.password;

    await student
      .findOne({ email: email_id })
      .exec()
      .then((value) => {
        if (!value) {
          return res
            .status(200)
            .json({ msg: "No Student Found In This Email" });
        } else {
          if (value?.password == password) {
            const user = {
              student_id: value?._id,
            };
            const token = Jwt.sign(user, process.env.SECRET);
            return res.json({ user, token });
          } else {
            return res.status(200).json({ msg: "Invalid Password" });
          }
        }
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Login };
