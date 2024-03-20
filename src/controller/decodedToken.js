const Jwt = require("jsonwebtoken");

const FetchUserId = (token) => {
  const tokenn = token.split(" ")[1];

  const decToken = Jwt.decode(tokenn);

  return decToken?.student_id;
};

module.exports = { FetchUserId };
