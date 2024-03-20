const Jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req?.headers["authorization"];
  // console.log("token =>  ", token);

  if (!token) {
    return res.json("Token Missing");
  }

  // split the token because it will contain Bearer key woek
  Jwt.verify(token.split(" ")[1], process.env.SECRET, (err, user) => {
    if (err) {
      return res.json("Wrong Token");
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
